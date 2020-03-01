/* eslint no-magic-numbers: ["warn", {ignore: [1, 2]}] */
import {ImageMetaData} from '../../assets/images';

export type LabelFunction = (
    x: number,
    y: number,
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D) => void;

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

    return (x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void => {
        const image = new Image();
        image.onload = (): void => {
            const imageHeight = image.height;
            const imageWidth = image.width;

            if (imageWidth > width || imageHeight > height) {
                // Scale the image evenly in both x & y.
                const scale = Math.min(width / imageWidth, height / imageHeight);
                image.width = imageWidth * scale;
                image.height = imageHeight * scale;
            }

            ctx.drawImage(image, x - (image.width / 2), y - (image.height / 2), image.width, image.height);
        };

        image.src = imageSrc;
    };
}
