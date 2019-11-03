export interface Entity {
}

export interface WireEntity extends Entity {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export interface EntityRenderer<T extends Entity> {
    /**
     * Render an entity to the canvas
     * 
     * @param ctx: Canvas Render Context.
     * @param entity: The entity to render.
     */
    render(ctx: CanvasRenderingContext2D, entity: T): void;
}


export class WireEntityRenderer implements EntityRenderer<WireEntity> {
    private static BEZIER_CONTROL_CONSTANT = 80;

    render(ctx: CanvasRenderingContext2D, {x1, y1, x2, y2}: WireEntity): void {
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