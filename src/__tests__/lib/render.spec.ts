import {
    WireEntity,
    WireEntityRenderer,
    FunctionEntity,
    FunctionEntityRenderer,
    CanvasConfigutation
} from '../../lib/render';

describe('wireEntityRenderer', () => {
    it('should match snapshot', () => {
        expect.assertions(2);

        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const config: CanvasConfigutation = {
            height: canvas.height,
            width: canvas.width,
            RENDER_UNITSQUARE_BOX: false
        };
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const entity: WireEntity = {
            x1: 20,
            x2: 30,
            y1: 20,
            y2: 20
        };

        const renderer = new WireEntityRenderer();
        renderer.render(config, ctx, entity);

        const events = ctx.__getEvents();
        expect(events).toMatchInlineSnapshot(`
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
            "x": 20,
            "y": 20,
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
            "cpx1": 100,
            "cpx2": -50,
            "cpy1": 20,
            "cpy2": 20,
            "x": 30,
            "y": 20,
          },
          "transform": Array [
            1,
            0,
            0,
            1,
            0,
            0,
          ],
          "type": "bezierCurveTo",
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
                  "x": 20,
                  "y": 20,
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
                  "cpx1": 100,
                  "cpx2": -50,
                  "cpy1": 20,
                  "cpy2": 20,
                  "x": 30,
                  "y": 20,
                },
                "transform": Array [
                  1,
                  0,
                  0,
                  1,
                  0,
                  0,
                ],
                "type": "bezierCurveTo",
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
        const calls = ctx.__getDrawCalls();
        expect(calls).toMatchInlineSnapshot(`
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
                  "x": 20,
                  "y": 20,
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
                  "cpx1": 100,
                  "cpx2": -50,
                  "cpy1": 20,
                  "cpy2": 20,
                  "x": 30,
                  "y": 20,
                },
                "transform": Array [
                  1,
                  0,
                  0,
                  1,
                  0,
                  0,
                ],
                "type": "bezierCurveTo",
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

describe('functionEntityRender', () => {
    it('should match snapshot', () => {
        expect.assertions(2);

        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const config: CanvasConfigutation = {
            height: canvas.height,
            width: canvas.width,
            RENDER_UNITSQUARE_BOX: false
        };
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const entity: FunctionEntity = {
            x1: 20,
            y1: 20,
            width: 100,
            height: 100,
            label: 'f'
        };

        const renderer = new FunctionEntityRenderer();
        renderer.render(config, ctx, entity);

        const events = ctx.__getEvents();
        expect(events).toMatchInlineSnapshot(`
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
            "height": 100,
            "width": 100,
            "x": 20,
            "y": 20,
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
                  "height": 100,
                  "width": 100,
                  "x": 20,
                  "y": 20,
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
        Object {
          "props": Object {
            "value": "center",
          },
          "transform": Array [
            1,
            0,
            0,
            1,
            0,
            0,
          ],
          "type": "textAlign",
        },
        Object {
          "props": Object {
            "maxWidth": null,
            "text": "f",
            "x": 70,
            "y": 70,
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
        Object {
          "props": Object {
            "text": "f",
          },
          "transform": Array [
            1,
            0,
            0,
            1,
            0,
            0,
          ],
          "type": "measureText",
        },
      ]
    `);
        const calls = ctx.__getDrawCalls();
        expect(calls).toMatchInlineSnapshot(`
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
                  "height": 100,
                  "width": 100,
                  "x": 20,
                  "y": 20,
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
        Object {
          "props": Object {
            "maxWidth": null,
            "text": "f",
            "x": 70,
            "y": 70,
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

    it('should throw warning if label is larger than function box', () => {
        expect.assertions(1);

        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const config: CanvasConfigutation = {
            height: canvas.height,
            width: canvas.width,
            RENDER_UNITSQUARE_BOX: false
        };
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const entity: FunctionEntity = {
            x1: 20,
            y1: 20,
            width: 10,
            height: 10,
            label: 'super long string that larger than width of box'
        };

        const renderer = new FunctionEntityRenderer();
        renderer.render(config, ctx, entity);

        expect(consoleSpy).toHaveBeenCalledWith(expect.anything());
    });
});
