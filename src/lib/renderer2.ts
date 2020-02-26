
// type RenderResult = [LineEntry[], BoxEntry[], LabelEntry[]];

// export function scaleRenderResult(renderResult: RenderResult, scaleX: number, scaleY: number): RenderResult {
//     const [lines, boxes, labels] = renderResult;
//     // Lines
//     const newLines = lines.map(([[x1, y1], [x2, y2]]): LineEntry => {
//         // X
//         const tx = (1 - scaleX) / 2;
//         const x1b = tx + x1;
//         const x2b = x2 - tx;

//         // Y
//         const ty = (1 - scaleY) / 2;
//         const y1b = ty + y1;
//         const y2b = y2 - ty;

//         return [[x1b, y1b], [x2b, y2b]];
//     });

//     // Boxes
//     const newBoxes = boxes.map(([[x, y], width, height]): BoxEntry => {
//         const newWidth = width * scaleX;
//         const newHeight = height * scaleY;
//         const offsetX = newWidth / 2;
//         const offsetY = newHeight / 2;

//         return [[x + offsetX, y + offsetY], newWidth, newHeight];
//     });

//     // TODO: Font / Image sizing.
//     const newLabels = labels.map(([label, [x, y]]): LabelEntry => [label, [x, y]]);

//     return [
//         newLines,
//         newBoxes,
//         newLabels
//     ];
// }

// export function transformRenderResult(renderResult: RenderResult, translateX: number, translateY: number): RenderResult {
//     const [lines, boxes, labels] = renderResult;
//     // Lines
//     const newLines = lines.map(([[x1, y1], [x2, y2]]): LineEntry => {
//         const x1b = x1 + translateX;
//         const y1b = y1 + translateY;
//         const x2b = x2 + translateX;
//         const y2b = y2 + translateY;
//         return [[x1b, y1b], [x2b, y2b]];
//     });

//     // Boxes
//     const newBoxes = boxes.map(([[x, y], width, height]): BoxEntry => {
//         const x2 = x + translateX;
//         const y2 = y + translateY;

//         return [[x2, y2], width, height];
//     });

//     // TODO: Font / Image sizing.
//     const newLabels = labels.map(([label, [x, y]]): LabelEntry => [label, [x + translateX, y + translateY]]);

//     return [
//         newLines,
//         newBoxes,
//         newLabels
//     ];
// }

// export function renderRenderResult(renderResult: RenderResult, ctx: CanvasRenderingContext2D): void {
//     const [lines, boxes, labels] = renderResult;
//     // Lines
//     lines.forEach(([[x1, y1], [x2, y2]]): void => {
//         ctx.beginPath();
//         ctx.moveTo(x1, y1);
//         ctx.lineTo(x2, y2);
//         ctx.stroke();
//     });

//     // Boxes
//     boxes.forEach(([[x, y], width, height]) => {
//         ctx.beginPath();
//         ctx.rect(x, y, width, height);
//         ctx.stroke();
//     });

//     labels.forEach(([label, [x, y]]) => {
//         label(x, y, ctx);
//     });
// }


// /**
//  * Result from visitor to give all the objects to draw to canvas.
//  */
// export class EntityRendererResult {
//     // Start [x,y], End [x,y]
//     public lines: LineEntry[] = [];
//     // Start [x,y], width, height
//     public boxes: BoxEntry[] = [];
//     // Label functions.
//     public labels: LabelEntry[] = [];

//     /**
//      * Scale an entity.
//      * A value of 1 wont change coordinates.
//      * 2 will double the size.
//      *
//      * @param scaleX X scaling value.
//      * @param scaleY Y scaling value.
//      */
//     public scale(scaleX: number, scaleY: number): void {
//         // Lines
//         this.lines = this.lines.map(([[x1, y1], [x2, y2]]): LineEntry => {
//             // X
//             const tx = (1 - scaleX) / 2;
//             const x1b = tx + x1;
//             const x2b = x2 - tx;

//             // Y
//             const ty = (1 - scaleY) / 2;
//             const y1b = ty + y1;
//             const y2b = y2 - ty;

//             return [[x1b, y1b], [x2b, y2b]];
//         });

//         // Boxes
//         this.boxes = this.boxes.map(([[x, y], width, height]): BoxEntry => {
//             const newWidth = width / scaleX;
//             const newHeight = height / scaleY;
//             const offsetX = newWidth / 2;
//             const offsetY = newHeight / 2;

//             return [[x + offsetX, y + offsetY], newWidth, newHeight];
//         });

//         // TODO: Font / Image sizing.
//         this.labels = this.labels.map(([label, [x, y]]): LabelEntry => [label, [x, y]]);
//     }

//     /**
//      * Translate the position of the entity.
//      *
//      * @param translateX X translation. Positive will move to the right.
//      * @param translateY Y translation. Positive will move downwards.
//      */
//     public translate(translateX: number, translateY: number): void {
//         // Lines
//         this.lines = this.lines.map(([[x1, y1], [x2, y2]]): LineEntry => {
//             const x1b = x1 + translateX;
//             const y1b = y1 + translateY;
//             const x2b = x2 + translateX;
//             const y2b = y2 + translateY;
//             return [[x1b, y1b], [x2b, y2b]];
//         });

//         // Boxes
//         this.boxes = this.boxes.map(([[x, y], width, height]): BoxEntry => {
//             const x2 = x + translateX;
//             const y2 = y + translateY;

//             return [[x2, y2], width, height];
//         });

//         // TODO: Font / Image sizing.
//         this.labels = this.labels.map(([label, [x, y]]): LabelEntry => [label, [x + translateX, y + translateY]]);
//     }
// }