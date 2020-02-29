/* eslint no-magic-numbers: ["warn", {"ignore": [0.5, 1, 2]}] */
import {
    EntityVisitor,
    FunctionEntity,
    GroupedEntity
} from './entities';
import {
    LabelFunction
} from './label';
import {RENDER_UNIT_SQUARE} from '../../assets/features';

type Point = [number, number];
type LineEntry = [Point, Point];
// [x1,y1], [x2,y2], isDrawn.
type BoxEntry = [Point, Point, boolean];
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
    featureFlags: {[featureId: string]: boolean};
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
export class EntityRendererVisitor extends EntityVisitor<EntityRendererVisitorContext, RenderResults> {
    /**
     * Renderer a Function to the Canvas.
     *
     * @param entity Function Entity.
     * @param context Visitor Context.
     * @returns All the individual canvas elements to draw.
     */
    visitFunction(entity: FunctionEntity, context: EntityRendererVisitorContext): RenderResults {
        const {x, y, width, height, label} = entity;
        const {featureFlags} = context;

        const drawBox = featureFlags[RENDER_UNIT_SQUARE] || false;
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        const functionRenderResult: RenderResults = {
            lines: [],
            boxes: [[[x, y], [x + width, y + height], drawBox]],
            labels: [[label, [x + halfWidth, y + halfHeight]]]
        };

        return functionRenderResult;
    }

    /**
     * Renderer a Group of Entities.
     *
     * @param entity Grouped Entity.
     * @param context Visitor Context.
     * @returns All the individual canvas elements to draw.
     */
    visitGrouped(entity: GroupedEntity, context: EntityRendererVisitorContext): RenderResults {
        const {children} = entity;
        const [left, right] = children;

        const {
            lines: llines,
            boxes: lboxes,
            labels: llabel
        } = left.visit(this, context);
        const {
            lines: rlines,
            boxes: rboxes,
            labels: rlabels
        } = right.visit(this, context);

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

    const items: [BoxEntry, LabelEntry][] = boxes.map(([[x, y], [x2, y2], drawBox], i) => {
        const [labelFunc] = labels[i];
        const newX = x * scaleX;
        const newX2 = x2 * scaleX;
        const newY = y * scaleY;
        const newY2 = y2 * scaleY;

        return [[[newX, newY], [newX2, newY2], drawBox], [labelFunc, [0.5 * (newX2 + newX), 0.5 * (newY2 + newY)]]];
    });

    const newBoxes = items.map(([b]) => b);
    const newLabels = items.map(([, l]) => l);

    return {
        lines,
        boxes: newBoxes,
        labels: newLabels
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
    const newBoxes = boxes.map(([[x, y], [x2, y2], drawBox]): BoxEntry => {
        return [[x + translateX, y + translateY], [x2 + translateX, y2 + translateY], drawBox];
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
    boxes.forEach(([[x, y], [x2, y2], drawBox], i) => {
        // This only works because theres a 1 to 1 relation between function boxes and labels.
        const [label, [labelX, labelY]] = labels[i];
        console.log('render box: ', x, y, x2, y2, labelX, labelY);
        const width = Math.abs(x2 - x);
        const height = Math.abs(y2 - y);

        if (drawBox) {
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.stroke();
        }

        label(labelX, labelY, width, height, ctx);
    });
}
