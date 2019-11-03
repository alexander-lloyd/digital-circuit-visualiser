export interface Entity {
}

export interface WireEntity extends Entity {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export interface FunctionEntity extends Entity {
    x1: number;
    y1: number;
    width: number;
    height: number;
    label: string;
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

export class FunctionEntityRenderer implements EntityRenderer<FunctionEntity> {
    render(ctx: CanvasRenderingContext2D, entity: FunctionEntity): void {
        const { x1, y1, height, width, label } = entity;

        // Box
        ctx.beginPath();
        ctx.rect(x1, y1, width, height);
        ctx.stroke();

        // Label
        ctx.textAlign = 'center';
        const xCenter = width / 2 + x1;
        const yCenter = height / 2 + y1;
        ctx.fillText(label, xCenter, yCenter);

        // Check the text fits in the box.
        const { width: textWidth } = ctx.measureText(label);
        // TODO: Check height
        if (textWidth > width) {
            console.warn(`Label ${label} is bigger than function box`);
        }
    }
}