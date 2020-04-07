import {FunctionEntity, GroupedEntity} from '../../../lib/render/entities';
import {Wire} from '../../../lib/render/types';
import {buildTextLabelFunction} from '../../../lib/render/label';
import {EntityRendererVisitor} from '../../../lib/render/render';
import {RENDER_UNIT_SQUARE} from '../../../assets/features';

describe('render graph', () => {
    describe('entity visitor', () => {
        it('should return a renderresult given a function', () => {
            expect.assertions(1);
            const label = buildTextLabelFunction('ABC');
            const entity = new FunctionEntity(0, 0, 1, 1, label, [], [], []);

            const entityVisitor = new EntityRendererVisitor();
            const visitorContext = {
                featureFlags: {},
                nesting: 0
            };

            const renderResult = entityVisitor.visit(entity, visitorContext);
            expect(renderResult).toMatchInlineSnapshot(`
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
                  "size": Array [
                    1,
                    1,
                  ],
                }
            `);
        });

        it('should set box to be rendered if feature flag is set', () => {
            expect.assertions(1);
            const label = buildTextLabelFunction('ABC');
            const wires: Wire[] = [];
            const entity = new FunctionEntity(0, 0, 1, 1, label, wires, [], []);

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
                      true,
                    ],
                  ],
                  "curves": Array [],
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
                  "size": Array [
                    1,
                    1,
                  ],
                }
            `);
        });

        it('should return render result for grouped entity', () => {
            expect.assertions(1);

            const label = buildTextLabelFunction('ABC');
            const wires: Wire[] = [];
            const lentity = new FunctionEntity(-0.5, 0, 0.5, 1, label, wires, [], []);
            const rentity = new FunctionEntity(0.5, 0, 0.5, 1, label, wires, [], []);
            const entity = new GroupedEntity('compose', 0, 0, 1, 1, [lentity, rentity], []);

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
                  "beziers": Array [],
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
                  "curves": Array [],
                  "labels": Array [
                    Array [
                      [Function],
                      Array [
                        -0.25,
                        0.5,
                      ],
                      0,
                      0,
                    ],
                    Array [
                      [Function],
                      Array [
                        0.75,
                        0.5,
                      ],
                      0,
                      0,
                    ],
                  ],
                  "lines": Array [],
                  "size": Array [
                    1,
                    1,
                  ],
                }
            `);
        });
    });
});
