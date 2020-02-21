import {HyperPositional} from './hypernet-render';
import {AST, ASTVisitor, IdentifierAST, ConstantAST, LetAST, BinaryOpAST, ApplicationAST} from './parser/index';

/**
 * Context required by the render functions about the canvas they are rendering on.
 * Also contains flags for rendering extra debug information.
 */
export interface CanvasConfigutation {
    height: number;
    width: number;

    RENDER_UNITSQUARE_BOX: boolean;
}

/**
 * A Wire Entity.
 */
export interface WireEntity {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

/**
 * A function block entity.
 */
export interface FunctionEntity {
    x1: number;
    y1: number;
    width: number;
    height: number;
    label: string;
}

/**
 * All entity renderers extend this interface.
 */
export interface EntityRenderer<T> {
    /**
     * Render an entity to the canvas.
     *
     * @param canvasConfig The Canvas Context.
     * @param renderCtx The Canvas Render Context.
     * @param entity The entity to render.
     */
    render(canvasConfig: CanvasConfigutation, renderCtx: CanvasRenderingContext2D, entity: T): void;
}


/**
 * Render a wire entity on a Canvas.
 */
export class WireEntityRenderer implements EntityRenderer<WireEntity> {
    private static BEZIER_CONTROL_CONSTANT = 80;

    /**
     * Render a wire to the canvas.
     *
     * @param canvasConfig Canvas context.
     * @param renderCtx Canvas Render Context.
     * @param entity The entity to render.
     */
    render(canvasConfig: CanvasConfigutation, renderCtx: CanvasRenderingContext2D, entity: WireEntity): void {
        const {x1, y1, x2, y2} = entity;
        renderCtx.beginPath();
        renderCtx.moveTo(x1, y1);
        renderCtx.bezierCurveTo(
            x1 + WireEntityRenderer.BEZIER_CONTROL_CONSTANT, y1,
            x2 - WireEntityRenderer.BEZIER_CONTROL_CONSTANT, y2,
            x2, y2
        );
        renderCtx.stroke();
    }
}

/**
 * Render a function entity to the canvas.
 */
export class FunctionEntityRenderer implements EntityRenderer<FunctionEntity> {
    /**
     * Render a function entity to the canvas.
     *
     * @param canvasConfig Canvas context.
     * @param renderCtx Canvas Render Context.
     * @param entity The entity to render.
     */
    render(canvasConfig: CanvasConfigutation, renderCtx: CanvasRenderingContext2D, entity: FunctionEntity): void {
        const {x1, y1, height, width, label} = entity;

        // Box
        renderCtx.beginPath();
        renderCtx.rect(x1, y1, width, height);
        renderCtx.stroke();

        // Label
        renderCtx.textAlign = 'center';
        const xCenter = (width / 2) + x1;
        const yCenter = (height / 2) + y1;
        renderCtx.fillText(label, xCenter, yCenter);

        // Check the text fits in the box.
        const {width: textWidth} = renderCtx.measureText(label);
        // TODO: Check height
        if (textWidth > width) {
            console.warn(`Label ${label} is bigger than function box`);
        }
    }
}

/**
 * Renderer a Hypernet.
 */
export class HypernetRenderer implements EntityRenderer<HyperPositional> {
    /**
     * Renderer a Hypernet.
     *
     * @param canvasConfig Canvas context.
     * @param renderCtx Canvas Render Context.
     * @param entity The entity to render.
     */
    public render(canvasConfig: CanvasConfigutation, renderCtx: CanvasRenderingContext2D, entity: HyperPositional): void {
        if (!entity.data) {
            throw Error('Entity does not have any positional data!');
        }

        // The variables x and y are in the unit square
        const {x, y, inputPositions, outputPositions} = entity.data;

        // TODO: Positions these properly.
        const height = 100;
        const width = 100;
        const x1 = x + 50;
        const x2 = x1 + width;
        const y1 = y;

        // Box
        if (canvasConfig.RENDER_UNITSQUARE_BOX) {
            renderCtx.beginPath();
            renderCtx.rect(x1, y1, width, height);
            renderCtx.stroke();
        }

        // Box connections.
        inputPositions.forEach((position: number) => {
            renderCtx.beginPath();
            renderCtx.moveTo(x1 - 10, position * height);
            renderCtx.lineTo(x1, position * height);
            renderCtx.stroke();
        });
        outputPositions.forEach((position: number) => {
            renderCtx.beginPath();
            renderCtx.moveTo(x2, position * height);
            renderCtx.lineTo(x2 + 10, position * height);
            renderCtx.stroke();
        });

        // Draw wires.
    }
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
     * @returns AST Node.
     */
    public visitApplication(ast: ApplicationAST): AST {
        return ast;
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
