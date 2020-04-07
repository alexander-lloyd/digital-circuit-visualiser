/* eslint no-magic-numbers: ["warn", {ignore: [0, 0.1, 0.5, 0.9, 1]}] */
import {ASTVisitor} from '../parser';
import * as AST from '../parser/ast';
import {images, ImageMetaData} from '../../assets/images';
import {buildTextImageFunction, buildTextLabelFunction} from './label';
import {scaleRenderResult, translateRenderResult} from './transform';
import {RenderResults, Point, LabelFunction, Wire} from './types';
import {getTerminatorPositions} from './draw';
import {RENDER_UNIT_SQUARE} from '../../assets/features';

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
export class Render2 extends ASTVisitor<null, RenderResults> {
    /**
     * Visit an Constant.
     *
     * @param ast Identifier AST Node.
     * @returns Render results.
     */
    public visitConstant(ast: AST.ConstantAST): RenderResults {
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

        return {
            lines: [],
            boxes: [[[0, 0], [1, 1], true]],
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
     * @returns Render results.
     */
    public visitBinaryOperator(ast: AST.BinaryOpAST): RenderResults {
        const {operator, left, right} = ast;

        let leftRR = left.visit(this, null);
        let rightRR = right.visit(this, null);
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
            throw new Error(`Unknown operator ${operator}`);
        }

        console.log(`On Operator ${operator} got ${inputs.length} inputs and ${outputs.length} outputs`);

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
