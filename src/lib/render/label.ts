/* eslint no-magic-numbers: ["warn", {ignore: [1, 2]}] */
import {ImageMetaData} from '../../assets/images';
import {getTerminatorPositions, renderCurve} from './draw';

import {LabelFunction} from './types';

const DEFAULT_FONT = 'Arial';
const DEFAULT_FONT_SIZE = 120;


/**
 * Build a text label function.
 *
 * @param label The label the function should generate.
 * @returns LabelFunction.
 */
export function buildTextLabelFunction(label: string): LabelFunction {
    return (x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void => {
        let fontSize = DEFAULT_FONT_SIZE;
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `${fontSize}px ${DEFAULT_FONT}`;
        while (ctx.measureText(label).width > width) {
            fontSize -= 1;
            ctx.font = `${fontSize}px Arial`;
        }
        ctx.fillText(label, x, y);
    };
}

/**
 * Draw an image into a function.
 *
 * @param imageMetaData Image meta data.
 * @returns LabelFunction.
 */
export function buildTextImageFunction(imageMetaData: ImageMetaData): LabelFunction {
    const imageSrc = imageMetaData.image;
    const image = new Image();
    image.src = imageSrc;

    return (x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void => {
        image.onload = (): void => {
            const oldHeight = image.height;
            const oldWidth = image.width;
            const ratio = image.width / image.height;
            image.height = 40;
            image.width = ratio * image.height;
            const scale = image.height / oldHeight;
            const imageWidth = 80;

            const centerX = image.width / 2;
            const centerY = image.height / 2;
            const topLeftX = x - centerX;
            const topLeftY = y - centerY;
            const boxTopLeftX = x - (imageWidth / 2);
            // TODO: renderBoxEntry(ctx, [[boxTopLeftX, topLeftY], [boxTopLeftX + imageWidth, topLeftY + image.height], true]);
            ctx.drawImage(image, topLeftX, topLeftY, image.width, image.height);
            const inputTerminatorPositions = getTerminatorPositions(imageMetaData.inputs.length);
            const outputTerminatorPositions = getTerminatorPositions(imageMetaData.outputs.length);
            imageMetaData.inputs.forEach(([ix, iy], i): void => {
                const x1 = boxTopLeftX;
                const y1 = topLeftY + (inputTerminatorPositions[i] * image.height);
                const x2 = topLeftX + (ix * scale);
                const y2 = topLeftY + (iy * scale);

                renderCurve(ctx, [[x1, y1], [x2, y2]]);
            });

            imageMetaData.outputs.forEach(([ix, iy], i) => {
                const x1 = topLeftX + (ix * scale);
                const y1 = topLeftY + (iy * scale);
                const x2 = boxTopLeftX + imageWidth;
                const y2 = topLeftY + (outputTerminatorPositions[i] * image.height);

                renderCurve(ctx, [[x1, y1], [x2, y2]]);
            });
        };
    };
}
