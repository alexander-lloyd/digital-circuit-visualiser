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

export type Wire = [Point, Point];
