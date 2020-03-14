export type LabelFunction = (
    x: number,
    y: number,
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D) => void;

export type Point = [number, number];
export type LineEntry = [Point, Point];
// [x1,y1], [x2,y2], isDrawn.
export type BoxEntry = [Point, Point, boolean];
// Label function, center point, number of inputs, number of outputs
export type LabelEntry = [LabelFunction, Point, number, number];

export type Bezier = [Point, Point, Point, Point];

export type Wire = Bezier;

export type RenderResults = {
    // Start [x,y], End [x,y]
    lines: LineEntry[];
    // Start [x,y], width, height
    boxes: BoxEntry[];
    // Label functions.
    labels: LabelEntry[];
    // Bezier curves
    curves: LineEntry[];
    // Size
    size: [number, number];

    beziers: Bezier[];
};
