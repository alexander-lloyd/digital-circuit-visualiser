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
 * Scale an entity.
 * A value of 1 wont change coordinates.
 * 2 will double the size.
 *
 * @param renderResults Render Result.
 * @param scaleX X scaling value.
 * @param scaleY Y scaling value.
 * @returns new Render Result.
 */
export function scaleRenderResult(renderResults: RenderResults, scaleX: number, scaleY: number): RenderResults {
    const {lines, boxes, labels} = renderResults;
    // Lines
    const newLines = lines.map(([[x1, y1], [x2, y2]]): LineEntry => {
        // X
        const tx = (1 - scaleX) / 2;
        const x1b = tx + x1;
        const x2b = x2 - tx;

        // Y
        const ty = (1 - scaleY) / 2;
        const y1b = ty + y1;
        const y2b = y2 - ty;

        return [[x1b, y1b], [x2b, y2b]];
    });

    return {
        lines,
        boxes: boxes.map(([[x, y], width, height]) => {
            const newWidth = width * scaleX;
            const newHeight = height * scaleY;
            return [[x * (scaleX / 2), y * (scaleY / 2)], newWidth, newHeight];
        }),
        labels: labels.map(([label, [x, y]]) => [label, [x * (scaleX / 2), y * (scaleY / 2)]])
    };
}

/**
 * Translate the position of the entity.
 *
 * @param renderResults Render Result.
 * @param translateX X translation. Positive will move to the right.
 * @param translateY Y translation. Positive will move downwards.
 * @returns New Render Result.
 */
export function transformRenderResult(
    renderResults: RenderResults,
    translateX: number,
    translateY: number
): RenderResults {
    const {lines, boxes, labels} = renderResults;
    // Lines
    const newLines = lines.map(([[x1, y1], [x2, y2]]): LineEntry => {
        const x1b = x1 + translateX;
        const y1b = y1 + translateY;
        const x2b = x2 + translateX;
        const y2b = y2 + translateY;
        return [[x1b, y1b], [x2b, y2b]];
    });

    // Boxes
    const newBoxes = boxes.map(([[x, y], width, height]): BoxEntry => {
        const x2 = x + translateX;
        const y2 = y + translateY;

        return [[x2, y2], width, height];
    });

    const newLabels = labels.map(([label, [x, y]]): LabelEntry => [label, [x + translateX, y + translateY]]);

    return {
        lines,
        boxes: newBoxes,
        labels: newLabels
    };
}


/**
 * Render to the Canvas.
 *
 * @param ctx Canvas Rendering Context.
 * @param renderResults Lists of items to render.
 */
export function renderResult(ctx: CanvasRenderingContext2D, renderResults: RenderResults): void {
    const {lines, boxes, labels} = renderResults;
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
        ctx.rect(x - (width / 2), y - (height / 2), width, height);
        ctx.stroke();
    });

    // Labels
    labels.forEach(([label, [x, y]]) => {
        // TODO: Font / Image sizing.
        label(x, y, ctx);
    });
}
