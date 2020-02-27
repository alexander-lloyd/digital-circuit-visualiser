/* eslint no-magic-numbers: ["warn", {"ignore": [-0.5, 0, 0.5, 1]}] */
import {
    buildTextImageFunction,
    buildTextLabelFunction,
    LabelFunction
} from './label';
import {
    Entity,
    FunctionEntity,
    GroupedEntity,
    Wire
} from './entities';
import {
    ASTVisitor,
    BinaryOpAST,
    ConstantAST
} from '../parser/index';
import {
    images
} from '../../assets/images';


/**
 * Scale and Transform the AST Nodes.
 */
export class ASTRenderer extends ASTVisitor<null, Entity> {
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
     * @returns Grouped Entity.
     */
    public visitBinaryOperator(ast: BinaryOpAST): Entity {
        const {operator} = ast;
        const left = ast.left.visit(this, null);
        const right = ast.right.visit(this, null);

        if (operator === 'tensor') {
            // Two operators are on top of each other.
            left.
                scale(1, 0.5).
                translate(0, 0.5);
            right.
                scale(1, 0.5).
                translate(0, -0.5);
        } else if (operator === 'compose') {
            left.
                scale(0.5, 1).
                translate(-0.5, 0);
            right.
                scale(0.5, 1).
                translate(0.5, 0);
        }

        return new GroupedEntity(0, 0, 1, 1, [left, right]);
    }

    /**
     * Visit application. Make no change to node.
     */
    public visitApplication(): never {
        throw new Error('ASTRenderer.visitApplication is not implemened');
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
}
