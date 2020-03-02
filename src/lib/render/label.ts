/* eslint no-magic-numbers: ["warn", {ignore: [1, 2]}] */
import {ImageMetaData} from '../../assets/images';
import {renderCross} from './draw';

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

    const imageHeight = image.height;
    const imageWidth = image.width;

    return (x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void => {
        image.onload = (): void => {
            let scale = 1;
            if (imageWidth > width || imageHeight > height) {
                // Scale the image evenly in both x & y.
                scale = Math.min(width / imageWidth, height / imageHeight);
                if (scale !== 1) {
                    image.width = imageWidth * scale;
                    image.height = imageHeight * scale;
                }
            }

            const centerX = image.width / 2;
            const centerY = image.height / 2;
            const topLeftX = x - centerX;
            const topLeftY = y - centerY;
            ctx.drawImage(image, topLeftX, topLeftY, image.width, image.height);
            imageMetaData.inputs.map(([ix, iy]) => renderCross(ctx, [topLeftX + ix, topLeftY + iy], 10));
            imageMetaData.outputs.map(([ix, iy]) => renderCross(ctx, [topLeftX + ix, topLeftY + iy], 10));
        };
    };
}
