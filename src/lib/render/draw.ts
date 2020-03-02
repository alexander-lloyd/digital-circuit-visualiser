/* eslint no-magic-numbers: ["warn", {"ignore": [2]}] */
import {
    LineEntry,
    Point
} from './types';

const DEFAULT_CROSS_SIZE = 5;

/**
 * Used in Debugging.
 *
 * @param point The position to draw the cross.
 * @param size The size of the cross.
 * @returns Line entries to draw the x.
 */
export function drawCross([x, y]: Point, size = DEFAULT_CROSS_SIZE): LineEntry[] {
    const halfSize = size / 2;
    return [
        [[x - halfSize, y - halfSize], [x + halfSize, y + halfSize]],
        [[x - halfSize, y + halfSize], [x + halfSize, y - halfSize]]
    ];
}

/**
 * Render a line on the Canvas.
 *
 * @param ctx Canvas Render Context.
 * @param line Line to draw.
 */
export function renderLineEntry(
    ctx: CanvasRenderingContext2D,
    [[x1, y1], [x2, y2]]: LineEntry
): void {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

/**
 * Render a cross to the Cavnas. Used for debugging.
 *
 * @param ctx Canvas Render Context.
 * @param point The point to draw the cross.
 * @param size Optional. The size of the cross.
 */
export function renderCross(ctx: CanvasRenderingContext2D, point: Point, size = DEFAULT_CROSS_SIZE): void {
    const lineEntries = drawCross(point, size);
    lineEntries.forEach((line: LineEntry) => renderLineEntry(ctx, line));
}

