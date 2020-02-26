/* eslint no-magic-numbers: ["warn", {"ignore": [1, 2]}] */
import {
    EntityVisitor,
    FunctionEntity,
    GroupedEntity
} from './entities';
import {
    LabelFunction
} from './label';

type Point = [number, number];
type LineEntry = [Point, Point];
type BoxEntry = [Point, number, number];
type LabelEntry = [LabelFunction, Point];

/**
 * Canvas Context.
 */
export interface CanvasContext {
    canvasWidth: number;
    canvasHeight: number;
}

/**
 * EntityRendererVisitor Context
 */
export interface EntityRendererVisitorContext {
    ctx: CanvasRenderingContext2D;
    canvasCtx: CanvasContext;
}

export type RenderResults = {
    // Start [x,y], End [x,y]
    lines: LineEntry[];
    // Start [x,y], width, height
    boxes: BoxEntry[];
    // Label functions.
    labels: LabelEntry[];
};

/**
 * Renderer the entities to the Canvas.
 */
export class EntityRendererVisitor extends EntityVisitor<null, RenderResults> {
    /**
     * Renderer a Function to the Canvas.
     *
     * @param entity Function Entity.
     * @returns All the individual canvas elements to draw.
     */
    visitFunction(entity: FunctionEntity): RenderResults {
        const {x, y, width, height, label} = entity;

        return {
            lines: [],
            boxes: [[[x, y], width, height]],
            labels: [[label, [x, y]]]
        };
    }

    /**
     * Renderer a Group of Entities.
     *
     * @param entity Grouped Entity.
     * @returns All the individual canvas elements to draw.
     */
    visitGrouped(entity: GroupedEntity): RenderResults {
        const {children} = entity;
        const [left, right] = children;

        const {
            lines: llines,
            boxes: lboxes,
            labels: llabel
        } = left.visit(this, null);
        const {
            lines: rlines,
            boxes: rboxes,
            labels: rlabels
        } = right.visit(this, null);

        return {
            lines: [...llines, ...rlines],
            boxes: [...lboxes, ...rboxes],
            labels: [...llabel, ...rlabels]
        };
    }
}


/**
 * Render to the Canvas.
 *
 * @param ctx Canvas Rendering Context.
 * @param renderResult Lists of items to render.
 */
export function renderResult(ctx: CanvasRenderingContext2D, renderResult: RenderResults): void {
    const {lines, boxes, labels} = renderResult;
    // Lines
    lines.forEach(([[x1, y1], [x2, y2]]): void => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    });

    // Boxes
    boxes.forEach(([[x, y], width, height]) => {
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();
    });

    // Labels
    labels.forEach(([label, [x, y]]) => {
        label(x, y, ctx);
    });
}
