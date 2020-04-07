/* eslint no-magic-numbers: ["warn", {ignore: [0, 0.1, 0.5, 0.9, 1]}] */
import {ASTVisitor} from '../parser';
import * as AST from '../parser/ast';
import {images, ImageMetaData} from '../../assets/images';
import {buildTextImageFunction, buildTextLabelFunction} from './label';
import {scaleRenderResult, translateRenderResult, scalePoint, translatePoint} from './transform';
import {RenderResults, Point, LabelFunction, LineEntry} from './types';
import {getTerminatorPositions} from './draw';

export type Renderer2Context = {
    inputs: Point[];
    outputs: Point[];
};

type Renderer2Result = RenderResults & Renderer2Context;

/**
 * Scale an internal render2result.
 *
 * @param result internal render result with inputs and outputs.
 * @param scaleX X scaling.
 * @param scaleY Y scaling.
 * @returns New render2 result.
 */
function scaleRender2Result(result: Renderer2Result, scaleX: number, scaleY: number): Renderer2Result {
    const renderResult = scaleRenderResult(result, scaleX, scaleY) as Renderer2Result;

    renderResult.inputs = result.inputs.map((p: Point) => scalePoint(p, scaleX, scaleY));
    renderResult.outputs = result.outputs.map((p: Point) => scalePoint(p, scaleX, scaleY));

    return renderResult;
}

/**
 * Translate an internal render2result.
 *
 * @param result internal render result with inputs and outputs.
 * @param translateX X translation.
 * @param translateY Y translation.
 * @returns New render2 result.
 */
function translateRender2Result(result: Renderer2Result, translateX: number, translateY: number): Renderer2Result {
    const renderResult = translateRenderResult(result, translateX, translateY) as Renderer2Result;

    renderResult.inputs = result.inputs.map((p: Point) => translatePoint(p, translateX, translateY));
    renderResult.outputs = result.outputs.map((p: Point) => translatePoint(p, translateX, translateY));

    return renderResult;
}

/**
 * New Renderer.
 */
export class Render2 extends ASTVisitor<null, RenderResults & Renderer2Context> {
    /**
     * Visit an Constant.
     *
     * @param ast Identifier AST Node.
     * @returns Render results.
     */
    public visitConstant(ast: AST.ConstantAST): Renderer2Result {
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
    public visitBinaryOperator(ast: AST.BinaryOpAST): Renderer2Result {
        const {operator, left, right} = ast;

        let leftRR = left.visit(this, null);
        let rightRR = right.visit(this, null);
        let wires: LineEntry[];
        let inputs: Point[];
        let outputs: Point[];

        if (operator === 'compose') {
            leftRR = scaleRender2Result(leftRR, 0.5, 1);
            rightRR = scaleRender2Result(rightRR, 0.5, 1);
            rightRR = translateRender2Result(rightRR, 0.5, 0);

            wires = rightRR.inputs.map(([ox, oy]: Point, i: number) => {
                const [ix, iy] = leftRR.outputs[i];
                return [[ox, oy], [ix, iy]];
            });
            ({inputs} = leftRR);
            ({outputs} = rightRR);
        } else if (operator === 'tensor') {
            leftRR = scaleRender2Result(leftRR, 1, 0.5);
            rightRR = scaleRender2Result(rightRR, 1, 0.5);
            rightRR = translateRender2Result(rightRR, 0, 0.5);
            wires = [];
            inputs = [...leftRR.inputs, ...rightRR.inputs];
            outputs = [...leftRR.outputs, ...rightRR.outputs];
        } else {
            throw new Error(`Unknown operator ${operator}`);
        }

        console.log(`On Operator ${operator} got ${inputs.length} inputs and ${outputs.length} outputs`);

        return {
            beziers: [...leftRR.beziers, ...rightRR.beziers],
            lines: [...wires, ...leftRR.lines, ...rightRR.lines],
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
    public visitUnaryOperator(ast: AST.UnaryOpAST): RenderResults & Renderer2Context {
        throw new Error('Method not implemented.');
    }

    /**
     * Visit an LetAST.
     *
     * @throws Method should never get called.
     */
    public visitLet(): RenderResults & Renderer2Context {
        throw new Error('Method not implemented.');
    }

    /**
     * Visit an Identifier.
     *
     * @throws Method should never get called.
     */
    public visitIdentifier(): RenderResults & Renderer2Context {
        throw new Error('Method not implemented.');
    }
}
