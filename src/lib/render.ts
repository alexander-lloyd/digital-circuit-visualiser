import {HyperPositional} from './hypernet-render';

/**
 * All Entities implement this interface.
 */
export interface Entity {
}

/**
 * A Wire Entity.
 */
export interface WireEntity extends Entity {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

/**
 * A function block entity.
 */
export interface FunctionEntity extends Entity {
    x1: number;
    y1: number;
    width: number;
    height: number;
    label: string;
}

/**
 * All entity renderers extend this interface.
 */
export interface EntityRenderer<T extends Entity> {
    /**
     * Render an entity to the canvas.
     *
     * @param ctx Canvas Render Context.
     * @param entity The entity to render.
     */
    render(ctx: CanvasRenderingContext2D, entity: T): void;
}


/**
 * Render a wire entity on a Canvas.
 */
export class WireEntityRenderer implements EntityRenderer<WireEntity> {
    private static BEZIER_CONTROL_CONSTANT = 80;

    /**
     * Render a wire to the canvas.
     *
     * @param ctx Canvas Render Context.
     * @param entity The entity to render.
     */
    render(ctx: CanvasRenderingContext2D, entity: WireEntity): void {
        const {x1, y1, x2, y2} = entity;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.bezierCurveTo(
            x1 + WireEntityRenderer.BEZIER_CONTROL_CONSTANT, y1,
            x2 - WireEntityRenderer.BEZIER_CONTROL_CONSTANT, y2,
            x2, y2
        );
        ctx.stroke();
    }
}

/**
 * Render a function entity to the canvas.
 */
export class FunctionEntityRenderer implements EntityRenderer<FunctionEntity> {
    /**
     * Render a function entity to the canvas.
     *
     * @param ctx Canvas Render Context.
     * @param entity The entity to render.
     */
    render(ctx: CanvasRenderingContext2D, entity: FunctionEntity): void {
        const {x1, y1, height, width, label} = entity;

        // Box
        ctx.beginPath();
        ctx.rect(x1, y1, width, height);
        ctx.stroke();

        // Label
        ctx.textAlign = 'center';
        const xCenter = (width / 2) + x1;
        const yCenter = (height / 2) + y1;
        ctx.fillText(label, xCenter, yCenter);

        // Check the text fits in the box.
        const {width: textWidth} = ctx.measureText(label);
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
     * @param ctx Canvas Context.
     * @param entity Hypernet.
     */
    public render(ctx: CanvasRenderingContext2D, entity: HyperPositional): void {
        if (!entity.data) {
            throw Error('Entity does not have any positional data!');
        }

        // The variables x and y are in the unit square
        const {x, y} = entity.data;

        // TODO: Positions these properly.
        const x1 = x + 100;
        const y1 = y + 100;
        const height = 100;
        const width = 100;


        // Box
        ctx.beginPath();
        ctx.rect(x1, y1, width, height);
        ctx.stroke();
    }
}
