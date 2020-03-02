/* eslint no-magic-numbers: ["warn", {"ignore": [-0.5, 0, 0.5, 1, 2]}] */
import {
    buildTextImageFunction,
    buildTextLabelFunction
} from './label';
import {getTerminatorPositions} from './draw';
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
 * ASTRendererConfig
 */
export interface ASTRendererConfig {
    depthX: number;
    depthY: number;
}

/**
 * Scale and Transform the AST Nodes.
 */
export class ASTRenderer extends ASTVisitor<ASTRendererConfig, Entity> {
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
        let inputPositions: number[] = [];
        let outputPositions: number[] = [];

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

            inputPositions = getTerminatorPositions(inputs.length);
            outputPositions = getTerminatorPositions(outputs.length);
        }

        return new FunctionEntity(0, 0, 1, 1, label, [], inputPositions, outputPositions);
    }

    /**
     * Visit binary operator. Make no change to node.
     *
     * @param ast AST Node.
     * @param config Depth of AST nodes.
     * @returns Grouped Entity.
     */
    public visitBinaryOperator(ast: BinaryOpAST, config: ASTRendererConfig): Entity {
        const {operator} = ast;
        const childConfig: ASTRendererConfig = {
            ...config,
            depthX: operator === 'compose' ? config.depthX + 1 : config.depthX,
            depthY: operator === 'tensor' ? config.depthY + 1 : config.depthY
        };
        const left = ast.left.visit(this, childConfig);
        const right = ast.right.visit(this, childConfig);

        if (operator === 'tensor') {
            // Two operators are on top of each other.
            left.
                scale(1, 0.5).
                translate(0, 0);
            right.
                scale(1, 0.5).
                translate(0, 1 / (2 ** config.depthY));
        } else if (operator === 'compose') {
            left.
                scale(0.5, 1).
                translate(0, 0);
            right.
                scale(0.5, 1).
                translate(1 / (2 ** config.depthX), 0);
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
