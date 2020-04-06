/* eslint-disable prefer-destructuring */
import {ASTVisitor} from '../parser';
import * as AST from '../parser/ast';
import {images, ImageMetaData} from '../../assets/images';
import {buildTextImageFunction, buildTextLabelFunction} from './label';
import {scaleRenderResult, translateRenderResult} from './transform';
import {RenderResults, Point, LabelFunction} from './types';

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
            inputs = imageMetaData.inputs;
            outputs = imageMetaData.outputs;
            label = buildTextImageFunction(imageMetaData);
        }

        return {
            lines: [],
            boxes: [[[0, 0], [1, 1], true]],
            labels: [[label, [0.5, 0.5], inputs.length, outputs.length]],
            curves: [],
            size: [1, 1],
            beziers: []
        };
    }

    /**
     * Visit an Binary Operator.
     *
     * @param ast Identifier AST Node.
     * @param context Null.
     * @returns Render results.
     */
    public visitBinaryOperator(ast: AST.BinaryOpAST, context: null): RenderResults {
        const {operator} = ast;
        let leftRR = ast.left.visit(this, context);
        let rightRR = ast.right.visit(this, context);

        if (operator === 'compose') {
            leftRR = scaleRenderResult(leftRR, 0.5, 1);
            rightRR = scaleRenderResult(rightRR, 0.5, 1);
            rightRR = translateRenderResult(rightRR, 0.5, 0);
        } else if (operator === 'tensor') {
            leftRR = scaleRenderResult(leftRR, 1, 0.5);
            rightRR = scaleRenderResult(rightRR, 1, 0.5);
            rightRR = translateRenderResult(rightRR, 0, 0.5);
        } else {
            throw new Error(`Unknown operator ${operator}`);
        }

        return {
            beziers: [...leftRR.beziers, ...rightRR.beziers],
            lines: [...leftRR.lines, ...rightRR.lines],
            boxes: [...leftRR.boxes, ...rightRR.boxes],
            labels: [...leftRR.labels, ...rightRR.labels],
            curves: [...leftRR.curves, ...rightRR.curves],
            size: [1, 1]
        };
    }

    /**
     * 
     * @param ast 
     * @param context 
     */
    public visitUnaryOperator(ast: AST.UnaryOpAST, context: null): RenderResults {
        throw new Error('Method not implemented.');
    }



    /**
     * 
     * @param ast 
     * @param context 
     */
    public visitLet(ast: AST.LetAST, context: null): RenderResults {
        throw new Error("Method not implemented.");
    }

    /**
     * Visit an Identifier.
     *
     * @param ast Identifier AST Node.
     * @returns Render results. 
     */
    public visitIdentifier(ast: AST.IdentifierAST): RenderResults {
        throw new Error('Method not implemented.');
    }


}