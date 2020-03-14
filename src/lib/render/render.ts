/* eslint no-magic-numbers: ["warn", {"ignore": [0.1, 0.5, 0.9, 1, 2]}] */
import {
    EntityVisitor,
    FunctionEntity,
    GroupedEntity
} from './entities';
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
import {RENDER_UNIT_SQUARE} from '../../assets/features';


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
        const {x, y, width, height, label, wires, inputs, outputs} = entity;
        const {featureFlags} = context;

        const drawBox = featureFlags[RENDER_UNIT_SQUARE] || false;
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        const functionRenderResult: RenderResults = {
            beziers: [],
            lines: [],
            boxes: [[[x, y], [x + width, y + height], drawBox]],
            labels: [[label, [x + halfWidth, y + halfHeight], inputs.length, outputs.length]],
            curves: [...wires],
            size: [width, height]
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
        const {children, operator} = entity;
        const [left, right] = children;

        const {
            beziers: lbeziers,
            lines: llines,
            boxes: lboxes,
            labels: llabel,
            curves: lcurves,
            size: [lwidth, lheight]
        } = left.visit(this, context);
        const {
            beziers: rbeziers,
            lines: rlines,
            boxes: rboxes,
            labels: rlabels,
            curves: rcurves,
            size: [rwidth, rheight]
        } = right.visit(this, context);

        let [width, height] = [lwidth, lheight];
        const gcurves: LineEntry[] = [];


        if (operator === 'tensor') {
            height += rheight;
        } else if (operator === 'compose') {
            width += rwidth;
            // Get lefts outputs.
            const leftOutputs = left.outputs;
            const rightInputs = right.inputs;
            if (leftOutputs.length !== rightInputs.length) {
                console.warn('Inputs !== Outputs in COMPOSE');
            }

            gcurves.push(...leftOutputs.map(([leftX, leftY], i): LineEntry => {
                const [rightX, rightY] = rightInputs[i];
                const x1 = left.x + leftX;
                const y1 = left.y + leftY;
                const x2 = right.x + (rightX * 0.1);
                const y2 = right.y + rightY;
                return [
                    [x1, y1],
                    [x2, y2]
                ];
            }));
        }

        return {
            beziers: [...lbeziers, ...rbeziers],
            lines: [...llines, ...rlines],
            boxes: [...lboxes, ...rboxes],
            labels: [...llabel, ...rlabels],
            curves: [...gcurves, ...lcurves, ...rcurves],
            size: [width, height]
        };
    }
}


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
