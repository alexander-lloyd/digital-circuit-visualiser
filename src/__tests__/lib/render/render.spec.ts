import {FunctionEntity, GroupedEntity} from '../../../lib/render/entities';
import {buildTextLabelFunction} from '../../../lib/render/label';
import {
    EntityRendererVisitor,
    RenderResults,
    scaleRenderResult
} from '../../../lib/render/render';
import {RENDER_UNIT_SQUARE} from '../../../assets/features';

describe('render graph', () => {
    describe('entity visitor', () => {
        it('should return a renderresult given a function', () => {
            expect.assertions(1);
            const label = buildTextLabelFunction('ABC');
            const entity = new FunctionEntity(0, 0, 1, 1, label);

            const entityVisitor = new EntityRendererVisitor();
            const visitorContext = {
                featureFlags: {},
                nesting: 0
            };

            const renderResult = entityVisitor.visit(entity, visitorContext);
            expect(renderResult).toMatchInlineSnapshot(`
                Object {
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
                  "labels": Array [
                    Array [
                      [Function],
                      Array [
                        0.5,
                        0.5,
                      ],
                    ],
                  ],
                  "lines": Array [],
                }
            `);
        });

        it('should set box to be rendered if feature flag is set', () => {
            expect.assertions(1);
            const label = buildTextLabelFunction('ABC');
            const entity = new FunctionEntity(0, 0, 1, 1, label);

            const entityVisitor = new EntityRendererVisitor();
            const visitorContext = {
                featureFlags: {
                    [RENDER_UNIT_SQUARE]: true
                },
                nesting: 0
            };

            const renderResult = entityVisitor.visit(entity, visitorContext);
            expect(renderResult).toMatchInlineSnapshot(`
                Object {
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
                      true,
                    ],
                  ],
                  "labels": Array [
                    Array [
                      [Function],
                      Array [
                        0.5,
                        0.5,
                      ],
                    ],
                  ],
                  "lines": Array [],
                }
            `);
        });

        it('should return render result for grouped entity', () => {
            expect.assertions(1);

            expect.assertions(1);
            const label = buildTextLabelFunction('ABC');
            const lentity = new FunctionEntity(-0.5, 0, 0.5, 1, label);
            const rentity = new FunctionEntity(0.5, 0, 0.5, 1, label);
            const entity = new GroupedEntity(0, 0, 1, 1, [lentity, rentity]);

            const entityVisitor = new EntityRendererVisitor();
            const visitorContext = {
                featureFlags: {
                    [RENDER_UNIT_SQUARE]: true
                },
                nesting: 0
            };

            const renderResult = entityVisitor.visit(entity, visitorContext);
            expect(renderResult).toMatchInlineSnapshot(`
                Object {
                  "boxes": Array [
                    Array [
                      Array [
                        -0.5,
                        0,
                      ],
                      Array [
                        0,
                        1,
                      ],
                      true,
                    ],
                    Array [
                      Array [
                        0.5,
                        0,
                      ],
                      Array [
                        1,
                        1,
                      ],
                      true,
                    ],
                  ],
                  "labels": Array [
                    Array [
                      [Function],
                      Array [
                        -0.25,
                        0.5,
                      ],
                    ],
                    Array [
                      [Function],
                      Array [
                        0.75,
                        0.5,
                      ],
                    ],
                  ],
                  "lines": Array [],
                }
            `);
        });
    });
});

describe('scale render result', () => {
    it('should return an empty renderer result when given an empty one', () => {
        expect.assertions(1);
        const renderResult: RenderResults = {
            boxes: [],
            labels: [],
            lines: []
        };

        expect(scaleRenderResult(renderResult, 2, 2)).toStrictEqual(renderResult);
    });

    it('should scale a box around the origin', () => {
        expect.assertions(1);
        const mockLabel = (): void => {};
        const renderResult: RenderResults = {
            boxes: [[[0, 0], [1, 1], true]],
            labels: [[mockLabel, [0, 0]]],
            lines: []
        };

        expect(scaleRenderResult(renderResult, 2, 2)).toStrictEqual({
            boxes: [[[0, 0], [2, 2], true]],
            labels: expect.anything(),
            lines: []
        });
    });

    it('should scale a box off the origin', () => {
        expect.assertions(1);
        const mockLabel = (): void => {};
        const renderResult: RenderResults = {
            boxes: [[[1, 1], [2, 2], true]],
            labels: [[mockLabel, [0, 0]]],
            lines: []
        };

        expect(scaleRenderResult(renderResult, 2, 2)).toStrictEqual({
            boxes: [[[2, 2], [4, 4], true]],
            labels: expect.anything(),
            lines: []
        });
    });

    it('should scale a label on the origin', () => {
        expect.assertions(1);
        const mockLabel = (): void => {};
        const renderResult: RenderResults = {
            boxes: [[[-1, -1], [1, 1], true]],
            labels: [[mockLabel, [0, 0]]],
            lines: []
        };

        expect(scaleRenderResult(renderResult, 2, 5)).toStrictEqual({
            boxes: [[[-2, -5], [2, 5], true]],
            labels: [[mockLabel, [0, 0]]],
            lines: []
        });
    });

    it('should scale a label off the origin', () => {
        expect.assertions(1);
        const mockLabel = (): void => {};
        const renderResult: RenderResults = {
            boxes: [[[4, 4], [6, 6], true]],
            labels: [[mockLabel, [5, 5]]],
            lines: []
        };

        expect(scaleRenderResult(renderResult, 2, 5)).toStrictEqual({
            boxes: [[[8, 20], [12, 30], true]],
            labels: [[mockLabel, [10, 25]]],
            lines: []
        });
    });
});
