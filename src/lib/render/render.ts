/* eslint no-magic-numbers: ["warn", {ignore: [0, 0.1, 0.5, 0.9, 1, 2]}] */
import {ASTVisitor} from '../parser';
import * as AST from '../parser/ast';
import {images, ImageMetaData} from '../../assets/images';
import {RENDER_UNIT_SQUARE} from '../../assets/features';

import {
    Bezier,
    LabelFunction,
    LineEntry,
    Point,
    RenderResults,
    Wire
} from './types';
import {
    renderBoxEntry,
    renderLineEntry,
    getTerminatorPositions,
    renderCurve,
    renderBezier
} from './draw';
import {buildTextImageFunction, buildTextLabelFunction} from './label';
import {scaleRenderResult, translateRenderResult} from './transform';


export type RendererContext = {
    featureFlags: { [flag: string]: boolean};
};

/**
 * Build error message.
 *
 * @param operator Operator not implemented.
 * @returns Error message.
 */
export function buildNotImplementedError(operator: string): string {
    return `Operator '${operator}' is not implemented`;
}

/**
 * Not Implemented Error.
 */
export class NotImplementedError extends Error {}


/**
 * New Renderer.
 */
export class Render extends ASTVisitor<RendererContext, RenderResults> {
    /**
     * Visit an Constant.
     *
     * @param ast Identifier AST Node.
     * @param context Render Context.
     * @returns Render results.
     */
    public visitConstant(ast: AST.ConstantAST, context: RendererContext): RenderResults {
        const {name} = ast;
        const imageMetaData: ImageMetaData | undefined = images[name];
        let inputs: Point[];
        let outputs: Point[];
        let label: LabelFunction;
        if (imageMetaData === undefined) {
            inputs = [];
            outputs = [];
            label = buildTextLabelFunction(name);
        } else {
            inputs = getTerminatorPositions(imageMetaData.inputs.length).
                map((y: number) => [0.1, y]);
            outputs = getTerminatorPositions(imageMetaData.outputs.length).
                map((y: number) => [0.9, y]);
            label = buildTextImageFunction(imageMetaData);
        }

        const shouldRenderSquare = context.featureFlags[RENDER_UNIT_SQUARE] || false;

        return {
            lines: [],
            boxes: [[[0, 0], [1, 1], shouldRenderSquare]],
            labels: [[label, [0.5, 0.5], inputs.length, outputs.length]],
            curves: [],
            size: [1, 1],
            beziers: [],
            inputs,
            outputs
        };
    }

    /**
     * Visit an Binary Operator.
     *
     * @param ast Identifier AST Node.
     * @param context Render Context.
     * @returns Render results.
     */
    public visitBinaryOperator(ast: AST.BinaryOpAST, context: RendererContext): RenderResults {
        const {operator, left, right} = ast;

        let leftRR = left.visit(this, context);
        let rightRR = right.visit(this, context);
        let wires: Wire[] = [];
        let inputs: Point[];
        let outputs: Point[];

        if (operator === 'compose') {
            leftRR = scaleRenderResult(leftRR, 0.5, 1);
            rightRR = scaleRenderResult(rightRR, 0.5, 1);
            rightRR = translateRenderResult(rightRR, 0.5, 0);

            wires = rightRR.inputs.map(([ox, oy]: Point, i: number) => {
                const [ix, iy] = leftRR.outputs[i];
                return [[ox, oy], [ix, iy], [ox - 0.1, oy], [ix + 0.1, iy]];
            });
            ({inputs} = leftRR);
            ({outputs} = rightRR);
        } else if (operator === 'tensor') {
            leftRR = scaleRenderResult(leftRR, 1, 0.5);
            rightRR = scaleRenderResult(rightRR, 1, 0.5);
            rightRR = translateRenderResult(rightRR, 0, 0.5);
            inputs = [...leftRR.inputs, ...rightRR.inputs];
            outputs = [...leftRR.outputs, ...rightRR.outputs];
        } else {
            throw buildNotImplementedError(operator);
        }

        return {
            beziers: [...wires, ...leftRR.beziers, ...rightRR.beziers],
            lines: [...leftRR.lines, ...rightRR.lines],
            boxes: [...leftRR.boxes, ...rightRR.boxes],
            labels: [...leftRR.labels, ...rightRR.labels],
            curves: [...leftRR.curves, ...rightRR.curves],
            size: [1, 1],
            inputs,
            outputs
        };
    }

    /**
     * Process a Unary Operator.
     *
     * @param ast Unary Operator AST.
     */
    public visitUnaryOperator(ast: AST.UnaryOpAST): RenderResults {
        throw new Error('Method not implemented.');
    }

    /**
     * Visit an LetAST.
     *
     * @throws Method should never get called.
     */
    public visitLet(): RenderResults {
        throw new Error('Method not implemented.');
    }

    /**
     * Visit an Identifier.
     *
     * @throws Method should never get called.
     */
    public visitIdentifier(): RenderResults {
        throw new Error('Method not implemented.');
    }
}


/**
 * Render to the Canvas.
 *
 * @param ctx Canvas Rendering Context.
 * @param renderResults Lists of items to render.
 */
export function renderResult(ctx: CanvasRenderingContext2D, renderResults: RenderResults): void {
    const {beziers, lines, boxes, labels, curves} = renderResults;

    // Boxes
    boxes.forEach((box, i) => {
        const [[x, y], [x2, y2], drawBox] = box;
        // This only works because theres a 1 to 1 relation between function boxes and labels.
        const [label, [labelX, labelY], inputs, outputs] = labels[i];
        const width = Math.abs(x2 - x);
        const height = Math.abs(y2 - y);
        // 10% away from edge of box so we can draw lines to connect gates.
        const relatveSeperationFromBox = 0.1;

        if (drawBox) {
            renderBoxEntry(ctx, box);
        }

        const labelWidth = 80;
        const labelHeight = 40;

        label(labelX, labelY, labelWidth, labelHeight, ctx);

        const inputPoints = getTerminatorPositions(inputs);
        const outputPoints = getTerminatorPositions(outputs);

        inputPoints.forEach((inputPos: number) => {
            renderCurve(ctx, [
                [x + (width * relatveSeperationFromBox), y + (height * inputPos)],
                [labelX - (labelWidth / 2), labelY - (labelHeight / 2) + (labelHeight * inputPos)]
            ]);
        });
        outputPoints.forEach((outputPos: number) => {
            renderCurve(ctx, [
                [labelX + (labelWidth / 2), labelY - (labelHeight / 2) + (labelHeight * outputPos)],
                [x2 - (width * relatveSeperationFromBox), y + (height * outputPos)]
            ]);
        });
    });

    // Lines
    lines.forEach((lineEntry: LineEntry): void => renderLineEntry(ctx, lineEntry));
    curves.forEach((lineEntry: LineEntry): void => renderCurve(ctx, lineEntry));
    beziers.forEach((b: Bezier) => renderBezier(ctx, ...b));
}
