import {ImageMetaData} from '../../assets/images';

export type LabelFunction = (x: number, y: number, ctx: CanvasRenderingContext2D) => void;

/**
 * Build a text label function.
 *
 * @param label The label the function should generate.
 * @returns LabelFunction.
 */
export function buildTextLabelFunction(label: string): LabelFunction {
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
export function buildTextImageFunction(imageMetaData: ImageMetaData): LabelFunction {
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
