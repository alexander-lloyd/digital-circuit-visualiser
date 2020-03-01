/* eslint no-magic-numbers: ["warn", {"ignore": [-0.5, 0, 0.5, 1, 2]}] */
import {
    buildTextImageFunction,
    buildTextLabelFunction
} from './label';
import {
    Entity,
    FunctionEntity,
    GroupedEntity,
    Wire
} from './entities';
import {
    LabelFunction
} from './types';
import {
    ASTVisitor,
    BinaryOpAST,
    ConstantAST
} from '../parser/index';
import {
    images
} from '../../assets/images';


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
 * Scale and Transform the AST Nodes.
 */
export class ASTRenderer extends ASTVisitor<number, Entity> {
    /**
     * Visit constant. Construct an Entity.
     *
     * @param ast AST Node.
     * @returns Function Entity.
     */
    public visitConstant(ast: ConstantAST): Entity {
        let label: LabelFunction;
        const {name} = ast;
        const imageMetaData = images[name];
        const wires: Wire[] = [];

        if (imageMetaData === undefined) {
            label = buildTextLabelFunction(name);
        } else {
            const {height, width, inputs, outputs} = imageMetaData;
            label = buildTextImageFunction(imageMetaData);
            wires.push(
                // TODO: Remove hard coded Origin.
                ...inputs.map(([x, y]): Wire => [[0, 0], [x / width, y / height]]),
                ...outputs.map(([x, y]): Wire => [[0, 0], [x / width, y / height]])
            );
        }

        console.log(wires);

        return new FunctionEntity(0, 0, 1, 1, label, wires);
    }

    /**
     * Visit binary operator. Make no change to node.
     *
     * @param ast AST Node.
     * @param depth Depth of AST nodes.
     * @returns Grouped Entity.
     */
    public visitBinaryOperator(ast: BinaryOpAST, depth: number): Entity {
        const {operator} = ast;
        const left = ast.left.visit(this, depth + 1);
        const right = ast.right.visit(this, depth + 1);

        if (operator === 'tensor') {
            // Two operators are on top of each other.
            left.
                scale(1, 0.5).
                translate(0, 0);
            right.
                scale(1, 0.5).
                translate(0, 1 / (2 ** depth));
        } else if (operator === 'compose') {
            left.
                scale(0.5, 1).
                translate(0, 0);
            right.
                scale(0.5, 1).
                translate(1 / (2 ** depth), 0);
        } else {
            throw new NotImplementedError(buildNotImplementedError(operator));
        }

        return new GroupedEntity(0, 0, 1, 1, [left, right]);
    }

    /**
     * Visit identifier.
     */
    public visitIdentifier(): never {
        throw new Error('ASTRenderer.visitIdentifier is not implemened');
    }

    /**
     * Visit let.
     */
    public visitLet(): never {
        throw new Error('ASTRenderer.visitIdentifier is not implemened');
    }

    /**
     * Visit Unary Operator.
     */
    public visitUnaryOperator(): never {
        throw new Error('ASTRenderer.visitIdentifier is not implemened');
    }
}
