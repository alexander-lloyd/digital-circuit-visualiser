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
export type LabelEntry = [LabelFunction, Point];
