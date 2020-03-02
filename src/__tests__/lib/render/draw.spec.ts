import {drawCross, getTerminatorPositions, renderLineEntry, renderBoxEntry, renderCross} from '../../../lib/render/draw';
import {Point, LineEntry, BoxEntry} from '../../../lib/render/types';

describe('terminator count function', () => {
    it.each([
        [0, []],
        [1, [0.5]],
        [2, [1 / 3, 2 / 3]],
        [3, [0.25, 0.5, 0.75]],
        [4, [0.2, 0.4, 0.6, 0.8]]
    ])('should compute position of unique square with %i inputs', (count, expected) => {
        expect.assertions(1);
        const positions = getTerminatorPositions(count);

        expect(positions).toStrictEqual(expected);
    });
});

describe('draw cross', () => {
    it('should draw a cross', () => {
        expect.assertions(1);
        const point: Point = [0, 0];
        expect(drawCross(point)).toMatchInlineSnapshot(`
            Array [
              Array [
                Array [
                  -2.5,
                  -2.5,
                ],
                Array [
                  2.5,
                  2.5,
                ],
              ],
              Array [
                Array [
                  -2.5,
                  2.5,
                ],
                Array [
                  2.5,
                  -2.5,
                ],
              ],
            ]
        `);
    });

    it('should draw a cross with different size', () => {
        expect.assertions(1);
        const point: Point = [0, 0];
        expect(drawCross(point, 20)).toMatchInlineSnapshot(`
            Array [
              Array [
                Array [
                  -10,
                  -10,
                ],
                Array [
                  10,
                  10,
                ],
              ],
              Array [
                Array [
                  -10,
                  10,
                ],
                Array [
                  10,
                  -10,
                ],
              ],
            ]
        `);
    });
});

describe('render line entry', () => {
    it('should render a line entry', () => {
        expect.assertions(1);
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const line: LineEntry = [
            [0, 0],
            [2, 3]
        ];

        renderLineEntry(ctx, line);
        expect(ctx.__getDrawCalls()).toMatchInlineSnapshot(`
Array [
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
            "x": 0,
            "y": 0,
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
            "x": 2,
            "y": 3,
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
    });
});

describe('render box entry', () => {
    it('should render a box entry', () => {
        expect.assertions(1);
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const box: BoxEntry = [[0, 0], [2, 3], true];

        renderBoxEntry(ctx, box);
        expect(ctx.__getDrawCalls()).toMatchInlineSnapshot(`
Array [
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
            "height": 3,
            "width": 2,
            "x": 0,
            "y": 0,
          },
          "transform": Array [
            1,
            0,
            0,
            1,
            0,
            0,
          ],
          "type": "rect",
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
    });
});

describe('render cross', () => {
    it('should render a cross', () => {
        expect.assertions(1);
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const point: Point = [1, 2];

        renderCross(ctx, point);
        expect(ctx.__getDrawCalls()).toMatchInlineSnapshot(`
Array [
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
            "x": -1.5,
            "y": -0.5,
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
            "x": 3.5,
            "y": 4.5,
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
            "x": -1.5,
            "y": 4.5,
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
            "x": 3.5,
            "y": -0.5,
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
    });

    it('should render a different sized cross', () => {
        expect.assertions(1);
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const point: Point = [1, 2];

        renderCross(ctx, point, 20);
        expect(ctx.__getDrawCalls()).toMatchInlineSnapshot(`
Array [
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
            "x": -9,
            "y": -8,
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
            "x": 11,
            "y": 12,
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
            "x": -9,
            "y": 12,
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
            "x": 11,
            "y": -8,
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
    });
});
