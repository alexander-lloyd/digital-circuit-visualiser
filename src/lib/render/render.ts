/* eslint no-magic-numbers: ["warn", {"ignore": [0.1, 0.5, 0.9, 1, 2]}] */
import {
    LineEntry,
    RenderResults,
    Bezier
} from './types';
import {
    renderBoxEntry,
    renderLineEntry,
    getTerminatorPositions,
    renderCurve,
    renderBezier
} from './draw';


/**
 * Render to the Canvas.
 *
 * @param ctx Canvas Rendering Context.
 * @param renderResults Lists of items to render.
 */
export function renderResult(ctx: CanvasRenderingContext2D, renderResults: RenderResults): void {
    const {beziers, lines, boxes, labels, curves} = renderResults;

    // Boxes
    boxes.forEach((box, i) => {
        const [[x, y], [x2, y2], drawBox] = box;
        // This only works because theres a 1 to 1 relation between function boxes and labels.
        const [label, [labelX, labelY], inputs, outputs] = labels[i];
        const width = Math.abs(x2 - x);
        const height = Math.abs(y2 - y);
        // 10% away from edge of box so we can draw lines to connect gates.
        const relatveSeperationFromBox = 0.1;

        if (drawBox) {
            renderBoxEntry(ctx, box);
        }

        const labelWidth = 80;
        const labelHeight = 40;

        label(labelX, labelY, labelWidth, labelHeight, ctx);

        const inputPoints = getTerminatorPositions(inputs);
        const outputPoints = getTerminatorPositions(outputs);

        inputPoints.forEach((inputPos: number) => {
            renderCurve(ctx, [
                [x + (width * relatveSeperationFromBox), y + (height * inputPos)],
                [labelX - (labelWidth / 2), labelY - (labelHeight / 2) + (labelHeight * inputPos)]
            ]);
        });
        outputPoints.forEach((outputPos: number) => {
            renderCurve(ctx, [
                [labelX + (labelWidth / 2), labelY - (labelHeight / 2) + (labelHeight * outputPos)],
                [x2 - (width * relatveSeperationFromBox), y + (height * outputPos)]
            ]);
        });
    });

    // Lines
    lines.forEach((lineEntry: LineEntry): void => renderLineEntry(ctx, lineEntry));
    curves.forEach((lineEntry: LineEntry): void => renderCurve(ctx, lineEntry));
    beziers.forEach((b: Bezier) => renderBezier(ctx, ...b));
}
