import {RenderResults, renderResult, Render} from '../../../lib/render';
import {ConstantAST, FileRange, BinaryOpAST, BinaryOpeators} from '../../../lib/parser';
import {buildNotImplementedError} from '../../../lib/render/render';

describe('render', () => {
    it('should render an ConstantAST', () => {
        expect.assertions(1);
        const location = {} as FileRange;
        const ast = new ConstantAST('AND', location);
        const renderer = new Render();
        const config = {
            featureFlags: {}
        };
        expect(renderer.visit(ast, config)).toMatchInlineSnapshot(`
            Object {
              "beziers": Array [],
              "boxes": Array [
                Array [
                  Array [
                    0,
                    0,
                  ],
                  Array [
                    1,
                    1,
                  ],
                  false,
                ],
              ],
              "curves": Array [],
              "inputs": Array [
                Array [
                  0.1,
                  0.3333333333333333,
                ],
                Array [
                  0.1,
                  0.6666666666666666,
                ],
              ],
              "labels": Array [
                Array [
                  [Function],
                  Array [
                    0.5,
                    0.5,
                  ],
                  2,
                  1,
                ],
              ],
              "lines": Array [],
              "outputs": Array [
                Array [
                  0.9,
                  0.5,
                ],
              ],
              "size": Array [
                1,
                1,
              ],
            }
        `);
    });

    it('should render an image its an undefined constant', () => {
        expect.assertions(1);
        const location = {} as FileRange;
        const ast = new ConstantAST('NON-EXISTENT', location);
        const renderer = new Render();
        const config = {
            featureFlags: {}
        };
        expect(renderer.visit(ast, config)).toMatchInlineSnapshot(`
Object {
  "beziers": Array [],
  "boxes": Array [
    Array [
      Array [
        0,
        0,
      ],
      Array [
        1,
        1,
      ],
      false,
    ],
  ],
  "curves": Array [],
  "inputs": Array [],
  "labels": Array [
    Array [
      [Function],
      Array [
        0.5,
        0.5,
      ],
      0,
      0,
    ],
  ],
  "lines": Array [],
  "outputs": Array [],
  "size": Array [
    1,
    1,
  ],
}
`);
    });

    it('should throw not implemented error on non-existent operator', () => {
        expect.assertions(1);
        const operator = 'non-existent-operator';
        const location = {} as FileRange;
        const ast = new BinaryOpAST(
            operator as BinaryOpeators,
            new ConstantAST('AND', location),
            new ConstantAST('AND', location),
            location
        );
        const renderer = new Render();
        const config = {
            featureFlags: {}
        };
        expect(() => renderer.visit(ast, config)).toThrow(buildNotImplementedError(operator));
    });

    it.each([
        ['visitLet'],
        ['visitIdentifier']
    ])('.%s should throw Error', (method) => {
        const renderer = new Render();
        expect(() => (renderer as any)[method](null, null)).toThrow(Error);
    });
});

describe('renderResult', () => {
    it('should render a render empty RenderResults', () => {
        expect.assertions(1);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const rr: RenderResults = {
            beziers: [],
            boxes: [],
            curves: [],
            inputs: [],
            labels: [],
            lines: [],
            outputs: [],
            size: [1, 1]
        };

        renderResult(ctx, rr);

        expect(ctx.__getEvents()).toMatchInlineSnapshot('Array []');
    });

    it('should render a box', () => {
        expect.assertions(3);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const mockLabel = jest.fn();
        const labelX = 1;
        const labelY = 2;

        const rr: RenderResults = {
            beziers: [],
            boxes: [[[1, 1], [2, 2], true]],
            curves: [],
            inputs: [],
            labels: [[mockLabel, [labelX, labelY], 1, 1]],
            lines: [],
            outputs: [],
            size: [1, 1]
        };

        renderResult(ctx, rr);

        expect(mockLabel).toHaveBeenCalledTimes(1);
        expect(mockLabel).toHaveBeenCalledWith(labelX, labelY, expect.any(Number), expect.any(Number), ctx);
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
                  "height": 1,
                  "width": 1,
                  "x": 1,
                  "y": 1,
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
                        "height": 1,
                        "width": 1,
                        "x": 1,
                        "y": 1,
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
                  "x": 1.1,
                  "y": 1.5,
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
                  "value": 2,
                },
                "transform": Array [
                  1,
                  0,
                  0,
                  1,
                  0,
                  0,
                ],
                "type": "lineWidth",
              },
              Object {
                "props": Object {
                  "cpx1": 51.1,
                  "cpx2": -89,
                  "cpy1": 1.5,
                  "cpy2": 2,
                  "x": -39,
                  "y": 2,
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
                        "x": 1.1,
                        "y": 1.5,
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
                        "cpx1": 51.1,
                        "cpx2": -89,
                        "cpy1": 1.5,
                        "cpy2": 2,
                        "x": -39,
                        "y": 2,
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
                  "x": 41,
                  "y": 2,
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
                  "value": 2,
                },
                "transform": Array [
                  1,
                  0,
                  0,
                  1,
                  0,
                  0,
                ],
                "type": "lineWidth",
              },
              Object {
                "props": Object {
                  "cpx1": 91,
                  "cpx2": -48.1,
                  "cpy1": 2,
                  "cpy2": 1.5,
                  "x": 1.9,
                  "y": 1.5,
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
                        "x": 41,
                        "y": 2,
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
                        "cpx1": 91,
                        "cpx2": -48.1,
                        "cpy1": 2,
                        "cpy2": 1.5,
                        "x": 1.9,
                        "y": 1.5,
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

    it('should not render the box', () => {
        expect.assertions(3);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const mockLabel = jest.fn();
        const labelX = 1;
        const labelY = 2;

        const rr: RenderResults = {
            beziers: [],
            boxes: [[[1, 1], [2, 2], false]],
            curves: [],
            inputs: [],
            labels: [[mockLabel, [labelX, labelY], 1, 1]],
            lines: [],
            outputs: [],
            size: [1, 1]
        };

        renderResult(ctx, rr);

        expect(mockLabel).toHaveBeenCalledTimes(1);
        expect(mockLabel).toHaveBeenCalledWith(labelX, labelY, expect.any(Number), expect.any(Number), ctx);
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
                  "x": 1.1,
                  "y": 1.5,
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
                  "value": 2,
                },
                "transform": Array [
                  1,
                  0,
                  0,
                  1,
                  0,
                  0,
                ],
                "type": "lineWidth",
              },
              Object {
                "props": Object {
                  "cpx1": 51.1,
                  "cpx2": -89,
                  "cpy1": 1.5,
                  "cpy2": 2,
                  "x": -39,
                  "y": 2,
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
                        "x": 1.1,
                        "y": 1.5,
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
                        "cpx1": 51.1,
                        "cpx2": -89,
                        "cpy1": 1.5,
                        "cpy2": 2,
                        "x": -39,
                        "y": 2,
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
                  "x": 41,
                  "y": 2,
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
                  "value": 2,
                },
                "transform": Array [
                  1,
                  0,
                  0,
                  1,
                  0,
                  0,
                ],
                "type": "lineWidth",
              },
              Object {
                "props": Object {
                  "cpx1": 91,
                  "cpx2": -48.1,
                  "cpy1": 2,
                  "cpy2": 1.5,
                  "x": 1.9,
                  "y": 1.5,
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
                        "x": 41,
                        "y": 2,
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
                        "cpx1": 91,
                        "cpx2": -48.1,
                        "cpy1": 2,
                        "cpy2": 1.5,
                        "x": 1.9,
                        "y": 1.5,
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

    it('should render lines', () => {
        expect.assertions(1);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const rr: RenderResults = {
            beziers: [],
            boxes: [],
            curves: [],
            inputs: [],
            labels: [],
            lines: [
                [
                    [1, 2],
                    [3, 4]
                ]
            ],
            outputs: [],
            size: [1, 1]
        };

        renderResult(ctx, rr);
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
                  "x": 1,
                  "y": 2,
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
                  "x": 3,
                  "y": 4,
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
                        "x": 1,
                        "y": 2,
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
                        "x": 3,
                        "y": 4,
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

    it('should render curves', () => {
        expect.assertions(1);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const rr: RenderResults = {
            beziers: [],
            boxes: [],
            curves: [
                [
                    [1, 2],
                    [3, 4]
                ]
            ],
            inputs: [],
            labels: [],
            lines: [],
            outputs: [],
            size: [1, 1]
        };

        renderResult(ctx, rr);
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
      "x": 1,
      "y": 2,
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
      "value": 2,
    },
    "transform": Array [
      1,
      0,
      0,
      1,
      0,
      0,
    ],
    "type": "lineWidth",
  },
  Object {
    "props": Object {
      "cpx1": 51,
      "cpx2": -47,
      "cpy1": 2,
      "cpy2": 4,
      "x": 3,
      "y": 4,
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
            "x": 1,
            "y": 2,
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
            "cpx1": 51,
            "cpx2": -47,
            "cpy1": 2,
            "cpy2": 4,
            "x": 3,
            "y": 4,
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

    it('should render beziers', () => {
        expect.assertions(1);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const rr: RenderResults = {
            beziers: [
                [
                    [1, 2],
                    [3, 4],
                    [2, 3],
                    [4, 5]
                ]
            ],
            boxes: [],
            curves: [],
            inputs: [],
            labels: [],
            lines: [],
            outputs: [],
            size: [1, 1]
        };

        renderResult(ctx, rr);
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
      "x": 1,
      "y": 2,
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
      "value": 2,
    },
    "transform": Array [
      1,
      0,
      0,
      1,
      0,
      0,
    ],
    "type": "lineWidth",
  },
  Object {
    "props": Object {
      "cpx1": 2,
      "cpx2": 4,
      "cpy1": 3,
      "cpy2": 5,
      "x": 3,
      "y": 4,
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
            "x": 1,
            "y": 2,
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
            "cpx1": 2,
            "cpx2": 4,
            "cpy1": 3,
            "cpy2": 5,
            "x": 3,
            "y": 4,
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
