import {buildTextLabelFunction, buildTextImageFunction} from '../../../lib/render/label';
import {ImageMetaData} from 'assets/images';

describe('text label', () => {
    it('should render a text label', () => {
        expect.assertions(1);
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const label = buildTextLabelFunction('ABC');

        label(10, 10, 100, 100, ctx);

        expect(ctx.__getDrawCalls()).toMatchInlineSnapshot(`
            Array [
              Object {
                "props": Object {
                  "maxWidth": null,
                  "text": "ABC",
                  "x": 10,
                  "y": 10,
                },
                "transform": Array [
                  1,
                  0,
                  0,
                  1,
                  0,
                  0,
                ],
                "type": "fillText",
              },
            ]
        `);
    });

    it('should resize text when box is small', () => {
        expect.assertions(1);
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        // Mock the measureText once so the text is bigger than the width of the bounding box.
        const measureTextSpy = jest.spyOn(ctx, 'measureText');
        measureTextSpy.mockImplementationOnce(() => ({
            width: 100
        } as TextMetrics));

        const label = buildTextLabelFunction('ABC');

        label(10, 10, 10, 10, ctx);

        expect(ctx.__getDrawCalls()).toMatchInlineSnapshot(`
Array [
  Object {
    "props": Object {
      "maxWidth": null,
      "text": "ABC",
      "x": 10,
      "y": 10,
    },
    "transform": Array [
      1,
      0,
      0,
      1,
      0,
      0,
    ],
    "type": "fillText",
  },
]
`);
    });
});

describe('image label', () => {
    it('should create a image label', () => {
        expect.assertions(1);

        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        // Mock the Image class.
        // eslint-disable-next-line no-multi-assign, jest/prefer-spy-on
        const imageMock = jest.fn();
        window.Image = imageMock;
        imageMock.mockImplementation();

        const metadata: ImageMetaData = {
            name: 'Mock Gate',
            height: 100,
            width: 100,
            image: './does-not-exist.svg',
            inputs: [],
            outputs: []
        };
        const label = buildTextImageFunction(metadata);

        label(10, 10, 200, 200, ctx);

        expect(imageMock).toHaveBeenCalledTimes(1);
        const [mockImage] = imageMock.mock.instances as HTMLImageElement[];

        const onload = mockImage.onload as () => void;
        // onload(); // TODO: Mock Image
    });
});
