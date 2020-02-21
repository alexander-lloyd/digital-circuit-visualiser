import {AST, ASTVisitor, IdentifierAST, ConstantAST, LetAST, BinaryOpAST, ApplicationAST} from './parser/index';

type LabelFunction = (x: number, y: number, ctx: CanvasRenderingContext2D) => void;

/**
 * Build a text label function.
 *
 * @param label The label the function should generate.
 * @returns LabelFunction.
 */
function buildTextLabelFunction(label: string): LabelFunction {
    return (x: number, y: number, ctx: CanvasRenderingContext2D): void => {
        ctx.textAlign = 'center';
        ctx.fillText(label, x, y);
    };
}

/**
 * A rendered entity.
 */
interface Entity {
    /**
     * Scale an entity.
     * A value of 1 wont change coordinates.
     * 2 will double the size.
     *
     * @param scaleX X scaling value.
     * @param scaleY Y scaling value.
     */
    scale(scaleX: number, scaleY: number): void;

    /**
     * Translate the position of the entity.
     *
     * @param translateX X translation. Positive will move to the right.
     * @param translateY Y translation. Positive will move downwards.
     */
    translate(translateX: number, translateY: number): void;

    /**
     * Visit the right method in the EntityVisitor.
     *
     * @param visitor EntityVisitor.
     */
    visit<T, R>(visitor: EntityVisitor<T, R>, context: T): R;
}

/**
 * Represents an object drawn on the canvas.
 *
 * Allows the object points to be manipulated before
 * drawing.
 */
class FunctionEntity implements Entity {
    /**
     * Constructor.
     *
     * @param x Top Left x
     * @param y Top Left y
     * @param width Box width
     * @param height Box height
     * @param label Function to draw the label.
     */
    public constructor(
        public x: number = 0,
        public y: number = 0,
        public width: number = 1,
        public height: number = 1,
        public label: LabelFunction
    ) {}

    /**
     * Scale the Function.
     *
     * @param scaleX X Scale.
     * @param scaleY Y Scale.
     */
    public scale(scaleX: number, scaleY: number): void {
        this.width *= scaleX;
        this.height *= scaleY;
    }

    /**
     * Translate the Function.
     *
     * @param translateX X Translation.
     * @param translateY Y Translation.
     */
    public translate(translateX: number, translateY: number): void {
        this.x += translateX;
        this.y += translateY;
    }

    /**
     * Visit the FunctionEntity method in the EntityVisitor.
     *
     * @param visitor EntityVisitor.
     * @param context EntityVisitor context.
     * @returns Return value of visitFunction.
     */
    public visit<T, R>(visitor: EntityVisitor<T, R>, context: T): R {
        return visitor.visitFunction(this, context);
    }
}

/**
 * Represents grouped objects rendered together.
 * For example, a binary operation,
 */
class GroupedEntity implements Entity {
    /**
     * Constructor.
     *
     * @param x Top Left x
     * @param y Top Left y
     * @param width Box width
     * @param height Box height
     * @param children Children Entities.
     */
    public constructor(
        public x: number = 0,
        public y: number = 0,
        public width: number = 1,
        public height: number = 1,
        public children: Entity[] = []
    ) {}

    /**
     * Scale the Function.
     *
     * @param scaleX X Scale.
     * @param scaleY Y Scale.
     */
    public scale(scaleX: number, scaleY: number): void {
        this.width *= scaleX;
        this.height *= scaleY;

        this.children.forEach((e: Entity) => e.scale(scaleX, scaleY));
    }

    /**
     * Translate the Function.
     *
     * @param translateX X Translation.
     * @param translateY Y Translation.
     */
    translate(translateX: number, translateY: number): void {
        this.x += translateX;
        this.y += translateY;

        this.children.forEach((e: Entity) => e.translate(translateX, translateY));
    }

    /**
     * Visit the GroupedEntity method in the EntityVisitor.
     *
     * @param visitor EntityVisitor.
     * @param context EntityVisitor context.
     * @returns Return value of visitGroup.
     */
    public visit<T, R>(visitor: EntityVisitor<T, R>, context: T): R {
        return visitor.visitGrouped(this, context);
    }
}

/**
 * EntityVisitor.
 */
export abstract class EntityVisitor<T, R> {
    /**
     * Visit the entity tree.
     *
     * @param entity Entity.
     * @param context Context required while visiting.
     * @returns What ever the EntityVisitor implementation returns.
     */
    public visit(entity: Entity, context: T): R {
        return entity.visit<T, R>(this, context);
    }

    abstract visitFunction(entity: FunctionEntity, context: T): R;
    abstract visitGrouped(entity: GroupedEntity, context: T): R;
}

export type ASTOptimisingTransformerContext = {
    identifiers: Map<string, AST>;
};

/**
 * Explore an AST and substitute variables from let bindings with the expression.
 *
 * E.g. let x = 5 in x + x
 * ===> 5 + 5
 */
export class ASTOptimisingTransformer extends ASTVisitor<ASTOptimisingTransformerContext, AST> {
    /**
     * Visit identifier. Make no change to node.
     *
     * @param ast AST Node.
     * @returns Identifier AST.
     */
    public visitIdentifier(ast: IdentifierAST): AST {
        return ast;
    }

    /**
     * Visit constant. Make no change to node.
     *
     * @param ast AST Node.
     * @returns AST Node.
     */
    public visitConstant(ast: ConstantAST): AST {
        return ast;
    }

    /**
     * Visit application. Make no change to node.
     *
     * @param ast AST Node.
     * @param context Visitor Context.
     * @returns AST Node.
     */
    public visitApplication(ast: ApplicationAST, context: ASTOptimisingTransformerContext): AST {
        const {name} = ast;
        const {identifiers} = context;

        const expression = identifiers.get(name);

        if (expression === undefined) {
            throw new Error(`Unknown Identifier '${name}'`);
        }

        return expression;
    }

    /**
     * Visit binary operator. Make no change to node.
     *
     * @param ast AST Node.
     * @returns AST Node.
     */
    public visitBinaryOperator(ast: BinaryOpAST): AST {
        return ast;
    }

    /**
     * Visit let.
     *
     * Going to replace any reference to identifier name in the body
     * with the expression.
     *
     * @param ast AST Node.
     * @param context AST Visitor Context.
     * @returns Optimised AST for rendering.
     */
    public visitLet(ast: LetAST, context: ASTOptimisingTransformerContext): AST {
        const {name} = ast.name;
        const expression = ast.expression.visit(this, context);
        context.identifiers.set(name, expression);

        return ast.expression.visit(this, context);
    }
}

/**
 * Scale and Transform the AST Nodes.
 */
export class ASTRenderer extends ASTVisitor<null, Entity> {
    /**
     * Visit identifier. Not yet implemented.
     */
    public visitIdentifier(): never {
        throw new Error('ASTRenderer.visitIdentifier is not implemened');
    }

    /**
     * Visit constant. Construct an Entity.
     *
     * @param ast AST Node.
     * @returns Function Entity.
     */
    public visitConstant(ast: ConstantAST): Entity {
        return new FunctionEntity(0, 0, 1, 1, buildTextLabelFunction(ast.name));
    }

    /**
     * Visit application. Make no change to node.
     */
    public visitApplication(): never {
        throw new Error('ASTRenderer.visitApplication is not implemened');
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
            left.scale(1, 0.5);
            right.scale(1, 0.5);
            left.translate(0, 0);
            right.translate(0, 0.5);
        } else if (operator === 'compose') {
            left.scale(0.5, 1);
            right.scale(0.5, 1);
            left.translate(0, 0);
            right.translate(0.5, 0);
        }

        return new GroupedEntity(0, 0, 1, 1, [left, right]);
    }

    /**
     * Visit let.
     *
     * Going to replace any reference to identifier name in the body
     * with the expression.
     */
    public visitLet(): never {
        throw new Error('Unexpected visit to Let node');
    }
}

/**
 * Canvas Context.
 */
interface CanvasContext {
    canvasWidth: number;
    canvasHeight: number;
}

/**
 * EntityRendererVisitor Context
 */
interface EntityRendererVisitorContext {
    ctx: CanvasRenderingContext2D;
    canvasCtx: CanvasContext;
}

/**
 * Renderer the entities to the Canvas.
 */
export class EntityRendererVisitor extends EntityVisitor<EntityRendererVisitorContext, void> {
    /**
     * Renderer a Function to the Canvas.
     *
     * @param entity Function Entity.
     * @param context Renderer Context.
     */
    visitFunction(entity: FunctionEntity, context: EntityRendererVisitorContext): void {
        const {ctx} = context;
        const {x, y, width, height, label} = entity;

        // Box
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();

        // Label
        const xCenter = (width / 2) + x;
        const yCenter = (height / 2) + y;
        label(xCenter, yCenter, ctx);
    }

    /**
     * Renderer a Group of Entities.
     *
     * @param entity Grouped Entity.
     * @param context Canvas Context.
     */
    visitGrouped(entity: GroupedEntity, context: EntityRendererVisitorContext): void {
        const {children} = entity;

        children.forEach((e: Entity) => e.visit(this, context));
    }
}
