/* eslint no-magic-numbers: ["warn", {"ignore": [0, 1, 2]}] */
import {
    BoxEntry,
    LineEntry,
    Point
} from './types';

const DEFAULT_CROSS_SIZE = 5;
const DEFAULT_CURVENESS = 50;

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
 * Work out where on the logic gate image the wires should connect.
 *
 * @param terminatorCount The number of connections.
 * @returns An array of the position along the Y axis in unit space.
 *
 * @example getTerminatorPositions(1) -> 0.5
 * @example getTerminatorPositions(2) -> [0.33, 0.66]
 */
export function getTerminatorPositions(terminatorCount: number): number[] {
    const unitSize = 1.0;
    const array: number[] = new Array(terminatorCount).
        fill(0).
        map((_, index) => unitSize * (index + 1) / (terminatorCount + 1));
    return array;
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
 * Render a box on the Canvas.
 *
 * @param ctx Canvas Render Context.
 * @param line Box to draw.
 */
export function renderBoxEntry(
    ctx: CanvasRenderingContext2D,
    [[x, y], [x2, y2]]: BoxEntry
): void {
    const width = Math.abs(x2 - x);
    const height = Math.abs(y2 - y);
    ctx.beginPath();
    ctx.rect(x, y, width, height);
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

/**
 * Render a bezier curve.
 *
 * @param ctx Canvas Render Context.
 * @param line Bezier line to draw.
 * @param bezierConstant Bezier Constant
 */
export function renderBezier(
    ctx: CanvasRenderingContext2D,
    [x1, y1]: Point,
    [x2, y2]: Point,
    [cp1x, cp1y]: Point,
    [cp2x, cp2y]: Point
): void {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineWidth = 2;
    ctx.bezierCurveTo(
        cp1x, cp1y,
        cp2x, cp2y,
        x2, y2
    );
    ctx.stroke();
}

/**
 * Render a curve curve.
 *
 * @param ctx Canvas Render Context.
 * @param line Curve to draw.
 * @param curveness Curveness Constant
 */
export function renderCurve(
    ctx: CanvasRenderingContext2D,
    [[x1, y1], [x2, y2]]: LineEntry,
    curveness = DEFAULT_CURVENESS
): void {
    renderBezier(
        ctx,
        [x1, y1],
        [x2, y2],
        [x1 + curveness, y1],
        [x2 - curveness, y2]
    );
}
