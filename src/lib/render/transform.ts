import {
    LineEntry,
    Bezier,
    Point
} from './types';

/**
 * Scale Point
 *
 * @param p Point.
 * @param scaleX X Scaling.
 * @param scaleY Y Scaling.
 * @returns Scaled point.
 */
function scalePoint([x, y]: Point, scaleX: number, scaleY: number): Point {
    return [x * scaleX, y * scaleY];
}

/**
 * Translate Point
 *
 * @param p Point.
 * @param translateX X Translation.
 * @param translateY Y Translation.
 * @returns Translated point.
 */
function translatePoint([x, y]: Point, translateX: number, translateY: number): Point {
    return [x + translateX, y + translateY];
}

/**
 * Scale a line entry
 *
 * @param line Line Entry.
 * @param scaleX scale X.
 * @param scaleY scale Y.
 * @returns New Line Entry.
 */
export function scaleLineEntry([p1, p2]: LineEntry, scaleX: number, scaleY: number): LineEntry {
    return [scalePoint(p1, scaleX, scaleY), scalePoint(p2, scaleX, scaleY)];
}

/**
 * Translate a line entry
 *
 * @param line Line Entry.
 * @param translateX translate X.
 * @param translateY translate Y.
 * @returns New Line Entry.
 */
export function translateLineEntry([p1, p2]: LineEntry, translateX: number, translateY: number): LineEntry {
    return [translatePoint(p1, translateX, translateY), translatePoint(p2, translateX, translateY)];
}

/**
 * Scale a bezier curve.
 *
 * @param b Bezier curve.
 * @param scaleX X scaling.
 * @param scaleY Y scaling.
 * @returns Scaled bezier curve.
 */
export function scaleBezierCurve(b: Bezier, scaleX: number, scaleY: number): Bezier {
    return (b as Point[]).map((p: Point) => scalePoint(p, scaleX, scaleY)) as Bezier;
}

/**
 * Translate a bezier curve.
 *
 * @param b Bezier curve.
 * @param translateX X translation.
 * @param translateY Y translation.
 * @returns Translated bezier curve.
 */
export function translateBezierCurve(b: Bezier, translateX: number, translateY: number): Bezier {
    return (b as Point[]).map((p: Point) => translatePoint(p, translateX, translateY)) as Bezier;
}
