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
        expect.assertions(3);

        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const drawImageSpy = jest.spyOn(ctx, 'drawImage').mockImplementation();

        // Mock the Image class.
        // eslint-disable-next-line no-multi-assign, jest/prefer-spy-on
        const imageMock = jest.fn();
        window.Image = imageMock;
        imageMock.mockImplementation();

        const metadata: ImageMetaData = {
            name: 'Mock Gate',
            description: '',
            height: 100,
            width: 100,
            image: './does-not-exist.svg',
            inputs: [],
            outputs: []
        };
        const label = buildTextImageFunction(metadata);

        const imageLoadFn = (label(10, 10, 200, 200, ctx) as unknown) as Function;

        expect(imageMock).toHaveBeenCalledTimes(1);

        imageLoadFn();
        expect(ctx.__getEvents()).toMatchInlineSnapshot('Array []');
        expect(drawImageSpy).toHaveBeenCalledTimes(1);
    });
    it('should create a image label with inputs and outputs', () => {
        expect.assertions(3);

        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const drawImageSpy = jest.spyOn(ctx, 'drawImage').mockImplementation();

        // Mock the Image class.
        // eslint-disable-next-line no-multi-assign, jest/prefer-spy-on
        const imageMock = jest.fn();
        window.Image = imageMock;
        imageMock.mockImplementation();

        const metadata: ImageMetaData = {
            name: 'Mock Gate',
            description: '',
            height: 100,
            width: 100,
            image: './does-not-exist.svg',
            inputs: [
                [0, 0],
                [0, 100]
            ],
            outputs: [[100, 50]]
        };
        const label = buildTextImageFunction(metadata);

        const imageLoadFn = (label(10, 10, 200, 200, ctx) as unknown) as Function;

        expect(imageMock).toHaveBeenCalledTimes(1);

        imageLoadFn();
        expect(ctx.__getEvents()).toMatchInlineSnapshot(`
Array [
  Object {
    "props": Object {},
    "transform": Array [
      1,
      0,
      0,
      1,
      0,
      0,
    ],
    "type": "beginPath",
  },
  Object {
    "props": Object {
      "x": -30,
      "y": 3.333333333333332,
    },
    "transform": Array [
      1,
      0,
      0,
      1,
      0,
      0,
    ],
    "type": "moveTo",
  },
  Object {
    "props": Object {
      "path": Array [
        Object {
          "props": Object {},
          "transform": Array [
            1,
            0,
            0,
            1,
            0,
            0,
          ],
          "type": "beginPath",
        },
        Object {
          "props": Object {
            "x": -30,
            "y": 3.333333333333332,
          },
          "transform": Array [
            1,
            0,
            0,
            1,
            0,
            0,
          ],
          "type": "moveTo",
        },
      ],
    },
    "transform": Array [
      1,
      0,
      0,
      1,
      0,
      0,
    ],
    "type": "stroke",
  },
  Object {
    "props": Object {},
    "transform": Array [
      1,
      0,
      0,
      1,
      0,
      0,
    ],
    "type": "beginPath",
  },
  Object {
    "props": Object {
      "x": -30,
      "y": 16.666666666666664,
    },
    "transform": Array [
      1,
      0,
      0,
      1,
      0,
      0,
    ],
    "type": "moveTo",
  },
  Object {
    "props": Object {
      "path": Array [
        Object {
          "props": Object {},
          "transform": Array [
            1,
            0,
            0,
            1,
            0,
            0,
          ],
          "type": "beginPath",
        },
        Object {
          "props": Object {
            "x": -30,
            "y": 16.666666666666664,
          },
          "transform": Array [
            1,
            0,
            0,
            1,
            0,
            0,
          ],
          "type": "moveTo",
        },
      ],
    },
    "transform": Array [
      1,
      0,
      0,
      1,
      0,
      0,
    ],
    "type": "stroke",
  },
  Object {
    "props": Object {},
    "transform": Array [
      1,
      0,
      0,
      1,
      0,
      0,
    ],
    "type": "beginPath",
  },
  Object {
    "props": Object {
      "x": 50,
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
    "type": "lineTo",
  },
  Object {
    "props": Object {
      "path": Array [
        Object {
          "props": Object {},
          "transform": Array [
            1,
            0,
            0,
            1,
            0,
            0,
          ],
          "type": "beginPath",
        },
        Object {
          "props": Object {
            "x": 50,
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
          "type": "lineTo",
        },
      ],
    },
    "transform": Array [
      1,
      0,
      0,
      1,
      0,
      0,
    ],
    "type": "stroke",
  },
]
`);
        expect(drawImageSpy).toHaveBeenCalledTimes(1);
    });
});
