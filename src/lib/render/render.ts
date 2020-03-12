/* eslint no-magic-numbers: ["warn", {"ignore": [0.1, 0.5, 0.9, 1, 2]}] */
import {
    EntityVisitor,
    FunctionEntity,
    GroupedEntity
} from './entities';
import {
    BoxEntry,
    LabelEntry,
    LineEntry
} from './types';
import {
    scaleLineEntry,
    translateLineEntry
} from './transform';
import {
    renderBoxEntry,
    renderLineEntry,
    renderBezier,
    getTerminatorPositions
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

export type RenderResults = {
    // Start [x,y], End [x,y]
    lines: LineEntry[];
    // Start [x,y], width, height
    boxes: BoxEntry[];
    // Label functions.
    labels: LabelEntry[];
    // Bezier curves
    beziers: LineEntry[];
    // Size
    size: [number, number];
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
        const {x, y, width, height, label, wires, inputs, outputs} = entity;
        const {featureFlags} = context;

        const drawBox = featureFlags[RENDER_UNIT_SQUARE] || false;
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        const functionRenderResult: RenderResults = {
            lines: [],
            boxes: [[[x, y], [x + width, y + height], drawBox]],
            labels: [[label, [x + halfWidth, y + halfHeight], inputs.length, outputs.length]],
            beziers: [...wires],
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
            lines: llines,
            boxes: lboxes,
            labels: llabel,
            beziers: lbeziers,
            size: [lwidth, lheight]
        } = left.visit(this, context);
        const {
            lines: rlines,
            boxes: rboxes,
            labels: rlabels,
            beziers: rbeziers,
            size: [rwidth, rheight]
        } = right.visit(this, context);

        let [width, height] = [lwidth, lheight];
        const gbeziers: LineEntry[] = [];


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

            gbeziers.push(...leftOutputs.map(([leftX, leftY], i): LineEntry => {
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
            lines: [...llines, ...rlines],
            boxes: [...lboxes, ...rboxes],
            labels: [...llabel, ...rlabels],
            beziers: [...gbeziers, ...lbeziers, ...rbeziers],
            size: [width, height]
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
    const {lines, boxes, labels, beziers, size: [width, height]} = renderResults;
    // Lines
    const newLines = lines.map((l: LineEntry) => scaleLineEntry(l, scaleX, scaleY));
    const newBeziers = beziers.map((l: LineEntry) => scaleLineEntry(l, scaleX, scaleY));

    const items: [BoxEntry, LabelEntry][] = boxes.map(([[x, y], [x2, y2], drawBox], i) => {
        const [labelFunc, , inputs, outputs] = labels[i];
        const newX = x * scaleX;
        const newX2 = x2 * scaleX;
        const newY = y * scaleY;
        const newY2 = y2 * scaleY;

        return [
            [[newX, newY], [newX2, newY2], drawBox],
            [labelFunc, [0.5 * (newX2 + newX), 0.5 * (newY2 + newY)], inputs, outputs]
        ];
    });

    const newBoxes = items.map(([b]) => b);
    const newLabels = items.map(([, l]) => l);

    return {
        lines: newLines,
        boxes: newBoxes,
        labels: newLabels,
        beziers: newBeziers,
        size: [width * scaleX, height * scaleY]
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
    const {lines, boxes, labels, beziers, size} = renderResults;
    // Lines
    const newLines = lines.map((l: LineEntry) => translateLineEntry(l, translateX, translateY));
    const newBeziers = beziers.map((l: LineEntry) => translateLineEntry(l, translateX, translateY));

    // Boxes
    const newBoxes = boxes.map(([[x, y], [x2, y2], drawBox]): BoxEntry => {
        const newX1 = x + translateX;
        const newX2 = x2 + translateX;
        const newY1 = y + translateY;
        const newY2 = y2 + translateY;
        return [[newX1, newY1], [newX2, newY2], drawBox];
    });

    const newLabels = labels.map(([label, [x, y], inputs, outputs]): LabelEntry => [
        label,
        [x + translateX, y + translateY],
        inputs,
        outputs
    ]);

    return {
        lines: newLines,
        boxes: newBoxes,
        labels: newLabels,
        beziers: newBeziers,
        size
    };
}


/**
 * Render to the Canvas.
 *
 * @param ctx Canvas Rendering Context.
 * @param renderResults Lists of items to render.
 */
export function renderResult(ctx: CanvasRenderingContext2D, renderResults: RenderResults): void {
    const {lines, boxes, labels, beziers} = renderResults;

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
            renderBezier(ctx, [
                [x + (width * relatveSeperationFromBox), y + (height * inputPos)],
                [labelX - (labelWidth / 2), labelY - (labelHeight / 2) + (labelHeight * inputPos)]
            ]);
        });
        outputPoints.forEach((outputPos: number) => {
            renderBezier(ctx, [
                [labelX + (labelWidth / 2), labelY - (labelHeight / 2) + (labelHeight * outputPos)],
                [x2 - (width * relatveSeperationFromBox), y + (height * outputPos)]
            ]);
        });
    });

    // Lines
    lines.forEach((lineEntry: LineEntry): void => renderLineEntry(ctx, lineEntry));
    beziers.forEach((lineEntry: LineEntry): void => renderBezier(ctx, lineEntry));
}
