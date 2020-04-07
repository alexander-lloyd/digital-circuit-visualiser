import {
    BoxEntry,
    LabelEntry,
    LineEntry,
    Bezier,
    Point,
    RenderResults
} from './types';

/**
 * Scale Point
 *
 * @param p Point.
 * @param scaleX X Scaling.
 * @param scaleY Y Scaling.
 * @returns Scaled point.
 */
export function scalePoint([x, y]: Point, scaleX: number, scaleY: number): Point {
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
export function translatePoint([x, y]: Point, translateX: number, translateY: number): Point {
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
    const {size: [width, height]} = renderResults;
    // Lines
    const lines = renderResults.lines.map((l: LineEntry) => scaleLineEntry(l, scaleX, scaleY));
    const curves = renderResults.curves.map((l: LineEntry) => scaleLineEntry(l, scaleX, scaleY));
    const beziers = renderResults.beziers.map((b: Bezier) => scaleBezierCurve(b, scaleX, scaleY));

    const items: [BoxEntry, LabelEntry][] = renderResults.boxes.map(([[x, y], [x2, y2], drawBox], i) => {
        const [labelFunc, , inputs, outputs] = renderResults.labels[i];
        const newX = x * scaleX;
        const newX2 = x2 * scaleX;
        const newY = y * scaleY;
        const newY2 = y2 * scaleY;

        return [
            [[newX, newY], [newX2, newY2], drawBox],
            [labelFunc, [0.5 * (newX2 + newX), 0.5 * (newY2 + newY)], inputs, outputs]
        ];
    });

    const boxes = items.map(([b]) => b);
    const newLabels = items.map(([, l]) => l);
    const inputs = renderResults.inputs.map((p: Point) => scalePoint(p, scaleX, scaleY));
    const outputs = renderResults.outputs.map((p: Point) => scalePoint(p, scaleX, scaleY));

    return {
        beziers,
        lines,
        boxes,
        labels: newLabels,
        curves,
        size: [width * scaleX, height * scaleY],
        inputs,
        outputs
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
export function translateRenderResult(
    renderResults: RenderResults,
    translateX: number,
    translateY: number
): RenderResults {
    const {size} = renderResults;
    // Lines
    const lines = renderResults.lines.map((l: LineEntry) => translateLineEntry(l, translateX, translateY));
    const curves = renderResults.curves.map((l: LineEntry) => translateLineEntry(l, translateX, translateY));
    const beziers = renderResults.beziers.map((b: Bezier) => translateBezierCurve(b, translateX, translateY));

    // Boxes
    const boxes = renderResults.boxes.map(([[x, y], [x2, y2], drawBox]): BoxEntry => {
        const newX1 = x + translateX;
        const newX2 = x2 + translateX;
        const newY1 = y + translateY;
        const newY2 = y2 + translateY;
        return [[newX1, newY1], [newX2, newY2], drawBox];
    });

    const labels = renderResults.labels.map(([label, [x, y], inputs, outputs]): LabelEntry => [
        label,
        [x + translateX, y + translateY],
        inputs,
        outputs
    ]);

    const inputs = renderResults.inputs.map((p: Point) => translatePoint(p, translateX, translateY));
    const outputs = renderResults.outputs.map((p: Point) => translatePoint(p, translateX, translateY));

    return {
        beziers,
        lines,
        boxes,
        labels,
        curves,
        size,
        inputs,
        outputs
    };
}
