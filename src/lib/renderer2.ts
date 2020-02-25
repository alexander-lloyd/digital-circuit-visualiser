import {ASTVisitor, ConstantAST, BinaryOpAST} from './parser/index';

import {ImageMetaData, images} from '../assets/images';


function pipe<T extends any[], R>(
    fn1: (...args: T) => R,
    ...fns: Array<(a: R) => R>
): (...args: T) => R {
    const piped = fns.reduce(
        (prevFn, nextFn) => (value: R) => nextFn(prevFn(value)),
        (value) => value
    );
    return (...args: T) => piped(fn1(...args));
}

export const compose = <R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>) => fns.reduce((prevFn, nextFn) => (value) => prevFn(nextFn(value)), fn1);


type LabelFunction = (x: number, y: number, ctx: CanvasRenderingContext2D) => void;

/**
 * Build a text label function.
 *
 * @param label The label the function should generate.
 * @returns LabelFunction.
 */
function buildTextLabelFunction(label: string): LabelFunction {
    return (x: number, y: number, ctx: CanvasRenderingContext2D): void => {
        ctx.textAlign = 'center';
        ctx.fillText(label, x, y);
    };
}

/**
 * Draw an image into a function.
 *
 * @param imageMetaData Image meta data.
 * @returns LabelFunction.
 */
function buildTextImageFunction(imageMetaData: ImageMetaData): LabelFunction {
    const imageSrc = imageMetaData.image;

    return (x: number, y: number, ctx: CanvasRenderingContext2D): void => {
        const image = new Image();
        image.onload = (): void => {
            const imageHeight = image.height;
            const imageWidth = image.width;

            ctx.drawImage(image, x - (imageWidth / 2), y - (imageHeight / 2));
        };

        image.src = `data:image/svg+xml;base64,${btoa(imageSrc)}`;
    };
}

/**
 * A rendered entity.
 */
// interface Entity {
//     x: number;
//     y: number;
//     width: number;
//     height: number;

//     /**
//      * Scale an entity.
//      * A value of 1 wont change coordinates.
//      * 2 will double the size.
//      *
//      * @param scaleX X scaling value.
//      * @param scaleY Y scaling value.
//      */
//     scale(scaleX: number, scaleY: number): void;

//     /**
//      * Translate the position of the entity.
//      *
//      * @param translateX X translation. Positive will move to the right.
//      * @param translateY Y translation. Positive will move downwards.
//      */
//     translate(translateX: number, translateY: number): void;

//     /**
//      * Visit the right method in the EntityVisitor.
//      *
//      * @param visitor EntityVisitor.
//      */
//     visit<T, R>(visitor: EntityVisitor<T, R>, context: T): R;
// }

/**
 * Represents an object drawn on the canvas.
 *
 * Allows the object points to be manipulated before
 * drawing.
 */
// class FunctionEntity implements Entity {
//     /**
//      * Constructor.
//      *
//      * @param x Top Left x
//      * @param y Top Left y
//      * @param width Box width
//      * @param height Box height
//      * @param label Function to draw the label.
//      */
//     public constructor(
//         public x: number = 0,
//         public y: number = 0,
//         public width: number = 1,
//         public height: number = 1,
//         public label: LabelFunction
//     ) {}

//     /**
//      * Scale the Function.
//      *
//      * @param scaleX X Scale.
//      * @param scaleY Y Scale.
//      */
//     public scale(scaleX: number, scaleY: number): void {
//         console.debug('[Function Entity]', 'scale', scaleX, scaleY);
//         const newWidth = this.width / scaleX;
//         const newHeight = this.height / scaleY;
//         const offsetX = newWidth / 2;
//         const offsetY = newHeight / 2;

//         this.x += offsetX;
//         this.y += offsetY;
//         this.width = newWidth;
//         this.height = newHeight;
//     }

//     /**
//      * Translate the Function.
//      *
//      * @param translateX X Translation.
//      * @param translateY Y Translation.
//      */
//     public translate(translateX: number, translateY: number): void {
//         console.debug('[Function Entity]', 'translate', translateX, translateY);
//         this.x += translateX;
//         this.y += translateY;
//     }

//     /**
//      * Visit the FunctionEntity method in the EntityVisitor.
//      *
//      * @param visitor EntityVisitor.
//      * @param context EntityVisitor context.
//      * @returns Return value of visitFunction.
//      */
//     public visit<T, R>(visitor: EntityVisitor<T, R>, context: T): R {
//         return visitor.visitFunction(this, context);
//     }
// }

/**
 * Represents grouped objects rendered together.
 * For example, a binary operation,
 */
// class GroupedEntity implements Entity {
//     /**
//      * Constructor.
//      *
//      * @param x Top Left x
//      * @param y Top Left y
//      * @param width Box width
//      * @param height Box height
//      * @param children Children Entities.
//      */
//     public constructor(
//         public x: number = 0,
//         public y: number = 0,
//         public width: number = 1,
//         public height: number = 1,
//         public children: [Entity, Entity]
//     ) {}

//     /**
//      * Scale the Function.
//      *
//      * @param scaleX X Scale.
//      * @param scaleY Y Scale.
//      */
//     public scale(scaleX: number, scaleY: number): void {
//         console.debug('[Grouped Entity]', 'scale', scaleX, scaleY);
//         this.width *= scaleX;
//         this.height *= scaleY;

//         const [first, second] = this.children;
//         const firstHeightA = first.height;
//         const firstWidthA = first.width;

//         this.children.forEach((e: Entity) => e.scale(scaleX, scaleY));

//         const firstHeightB = first.height;
//         const firstWidthB = first.width;

//         // TODO: firstWidthB - firstWidthA
//         second.translate(0, firstHeightB - firstHeightA);
//     }

//     /**
//      * Translate the Function.
//      *
//      * @param translateX X Translation.
//      * @param translateY Y Translation.
//      */
//     translate(translateX: number, translateY: number): void {
//         console.debug('[Grouped Entity]', 'translate', translateX, translateY);
//         this.x += translateX;
//         this.y += translateY;

//         this.children.forEach((e: Entity) => e.translate(translateX, translateY));
//     }

//     /**
//      * Visit the GroupedEntity method in the EntityVisitor.
//      *
//      * @param visitor EntityVisitor.
//      * @param context EntityVisitor context.
//      * @returns Return value of visitGroup.
//      */
//     public visit<T, R>(visitor: EntityVisitor<T, R>, context: T): R {
//         return visitor.visitGrouped(this, context);
//     }
// }

/**
 * EntityVisitor.
 */
// export abstract class EntityVisitor<T, R> {
//     /**
//      * Visit the entity tree.
//      *
//      * @param entity Entity.
//      * @param context Context required while visiting.
//      * @returns What ever the EntityVisitor implementation returns.
//      */
//     public visit(entity: Entity, context: T): R {
//         return entity.visit<T, R>(this, context);
//     }

//     abstract visitFunction(entity: FunctionEntity, context: T): R;
//     abstract visitGrouped(entity: GroupedEntity, context: T): R;
// }



type Point = [number, number];
type LineEntry = [Point, Point];
type BoxEntry = [Point, number, number];
type LabelEntry = [LabelFunction, Point];

/**
 * Result from visitor to give all the objects to draw to canvas.
 */
export class EntityRendererResult {
    // Start [x,y], End [x,y]
    public lines: LineEntry[] = [];
    // Start [x,y], width, height
    public boxes: BoxEntry[] = [];
    // Label functions.
    public labels: LabelEntry[] = [];

    /**
     * Scale an entity.
     * A value of 1 wont change coordinates.
     * 2 will double the size.
     *
     * @param scaleX X scaling value.
     * @param scaleY Y scaling value.
     */
    public scale(scaleX: number, scaleY: number): void {
        // Lines
        this.lines = this.lines.map(([[x1, y1], [x2, y2]]): LineEntry => {
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

        // Boxes
        this.boxes = this.boxes.map(([[x, y], width, height]): BoxEntry => {
            const newWidth = width / scaleX;
            const newHeight = height / scaleY;
            const offsetX = newWidth / 2;
            const offsetY = newHeight / 2;

            return [[x + offsetX, y + offsetY], newWidth, newHeight];
        });

        // TODO: Font / Image sizing.
        this.labels = this.labels.map(([label, [x, y]]): LabelEntry => [label, [x, y]]);
    }

    /**
     * Translate the position of the entity.
     *
     * @param translateX X translation. Positive will move to the right.
     * @param translateY Y translation. Positive will move downwards.
     */
    public translate(translateX: number, translateY: number): void {
        // Lines
        this.lines = this.lines.map(([[x1, y1], [x2, y2]]): LineEntry => {
            const x1b = x1 + translateX;
            const y1b = y1 + translateY;
            const x2b = x2 + translateX;
            const y2b = y2 + translateY;
            return [[x1b, y1b], [x2b, y2b]];
        });

        // Boxes
        this.boxes = this.boxes.map(([[x, y], width, height]): BoxEntry => {
            const x2 = x + translateX;
            const y2 = y + translateY;

            return [[x2, y2], width, height];
        });

        // TODO: Font / Image sizing.
        this.labels = this.labels.map(([label, [x, y]]): LabelEntry => [label, [x + translateX, y + translateY]]);
    }

    /**
     * Render to the Canvas.
     *
     * @param ctx The Canvas Rendering Context.
     */
    public render(ctx: CanvasRenderingContext2D): void {
    }
}

type RenderResult = [LineEntry[], BoxEntry[], LabelEntry[]];

export function scaleRenderResult(renderResult: RenderResult, scaleX: number, scaleY: number): RenderResult {
    const [lines, boxes, labels] = renderResult;
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

    // Boxes
    const newBoxes = boxes.map(([[x, y], width, height]): BoxEntry => {
        const newWidth = width * scaleX;
        const newHeight = height * scaleY;
        const offsetX = newWidth / 2;
        const offsetY = newHeight / 2;

        return [[x + offsetX, y + offsetY], newWidth, newHeight];
    });

    // TODO: Font / Image sizing.
    const newLabels = labels.map(([label, [x, y]]): LabelEntry => [label, [x, y]]);

    return [
        newLines,
        newBoxes,
        newLabels
    ];
}

export function transformRenderResult(renderResult: RenderResult, translateX: number, translateY: number): RenderResult {
    const [lines, boxes, labels] = renderResult;
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

    // TODO: Font / Image sizing.
    const newLabels = labels.map(([label, [x, y]]): LabelEntry => [label, [x + translateX, y + translateY]]);

    return [
        newLines,
        newBoxes,
        newLabels
    ];
}

export function renderRenderResult(renderResult: RenderResult, ctx: CanvasRenderingContext2D): void {
    const [lines, boxes, labels] = renderResult;
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

    labels.forEach(([label, [x, y]]) => {
        label(x, y, ctx);
    });
}


/**
 * Scale and Transform the AST Nodes.
 */
export class ASTRenderer extends ASTVisitor<null, RenderResult> {
    /**
     * Visit identifier. Not yet implemented.
     */
    public visitIdentifier(): never {
        throw new Error('ASTRenderer.visitIdentifier is not implemened');
    }

    /**
     * Visit constant. Construct an Entity.
     *
     * @param ast AST Node.
     * @returns Function Entity.
     */
    public visitConstant(ast: ConstantAST): RenderResult {
        let labelFunc: LabelFunction;
        const {name} = ast;
        const imageMetaData = images[name];

        if (imageMetaData === undefined) {
            labelFunc = buildTextLabelFunction(name);
        } else {
            labelFunc = buildTextImageFunction(imageMetaData);
        }

        return [
            // Line
            [],
            // Box
            [[[0, 0], 1, 1]],
            // Label
            [[labelFunc, [0.5, 0.5]]]
        ];
    }

    /**
     * Visit application. Make no change to node.
     */
    public visitApplication(): never {
        throw new Error('ASTRenderer.visitApplication is not implemened');
    }

    /**
     * Visit binary operator. Make no change to node.
     *
     * @param ast AST Node.
     * @returns Grouped Entity.
     */
    public visitBinaryOperator(ast: BinaryOpAST): RenderResult {
        const {operator} = ast;
        let lresult = ast.left.visit(this, null);
        let rresult = ast.right.visit(this, null);

        if (operator === 'tensor') {
            // Two operators are on top of each other.
            lresult = scaleRenderResult(lresult, 1, 0.5);
            rresult = scaleRenderResult(rresult, 1, 0.5);
            lresult = transformRenderResult(lresult, 0, 0);
            rresult = transformRenderResult(rresult, 0, 0.5);
        } else if (operator === 'compose') {
            lresult = scaleRenderResult(lresult, 0.5, 1);
            rresult = scaleRenderResult(rresult, 0.5, 1);
            lresult = transformRenderResult(lresult, 0, 0);
            rresult = transformRenderResult(rresult, 0.5, 0);
        }

        const [llines, lboxes, llabels] = lresult;
        const [rlines, rboxes, rlabels] = rresult;

        return [
            [...llines, ...rlines],
            [...lboxes, ...rboxes],
            [...llabels, ...rlabels]
        ];
    }

    /**
     * Visit let.
     *
     * Going to replace any reference to identifier name in the body
     * with the expression.
     */
    public visitLet(): never {
        throw new Error('Unexpected visit to Let node');
    }
}

/**
 * Canvas Context.
 */
// interface CanvasContext {
//     canvasWidth: number;
//     canvasHeight: number;
// }

/**
 * EntityRendererVisitor Context
 */
// interface EntityRendererVisitorContext {
//     ctx: CanvasRenderingContext2D;
//     canvasCtx: CanvasContext;
//     result: EntityRendererResult;
// }

/**
 * Renderer the entities to the Canvas.
 */
// export class EntityRendererVisitor extends EntityVisitor<EntityRendererVisitorContext, void> {
//     /**
//      * Renderer a Function to the Canvas.
//      *
//      * @param entity Function Entity.
//      * @param context Renderer Context.
//      */
//     visitFunction(entity: FunctionEntity, context: EntityRendererVisitorContext): void {
//         const {result} = context;
//         const {x, y, width, height, label} = entity;

//         // Box
//         result.boxes.push([[x, y], width, height]);

//         // Label
//         const xCenter = (width / 2) + x;
//         const yCenter = (height / 2) + y;
//         result.labels.push([label, [xCenter, yCenter]]);
//     }

//     /**
//      * Renderer a Group of Entities.
//      *
//      * @param entity Grouped Entity.
//      * @param context Canvas Context.
//      */
//     visitGrouped(entity: GroupedEntity, context: EntityRendererVisitorContext): void {
//         const {children} = entity;

//         children.forEach((e: Entity) => e.visit(this, context));
//     }
// }
