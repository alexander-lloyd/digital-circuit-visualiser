import {ASTRenderer, buildNotImplementedError} from '../../../lib/render/visitor';
import {ConstantAST, BinaryOpAST, BinaryOpeators} from '../../../lib/parser/ast';
import {GroupedEntity} from 'lib/render/entities';

describe('ast renderer', () => {
    it('should create a function entity', () => {
        expect.assertions(4);

        const location = {
            start: {
                offset: 0,
                line: 0,
                column: 0
            },
            end: {
                offset: 0,
                line: 0,
                column: 0
            }
        };

        const ast = new ConstantAST('AND', location);
        const renderer = new ASTRenderer();
        const entity = renderer.visit(ast, {
            depthX: 1,
            depthY: 1
        });

        expect(entity.x).toBe(0);
        expect(entity.y).toBe(0);
        expect(entity.width).toBe(1);
        expect(entity.height).toBe(1);
    });

    it('should group tensor functions', () => {
        expect.assertions(12);

        const location = {
            start: {
                offset: 0,
                line: 0,
                column: 0
            },
            end: {
                offset: 0,
                line: 0,
                column: 0
            }
        };

        const ast = new BinaryOpAST('tensor', new ConstantAST('AND', location), new ConstantAST('OR', location), location);
        const renderer = new ASTRenderer();
        const entity = renderer.visit(ast, {
            depthX: 1,
            depthY: 1
        }) as GroupedEntity;

        expect(entity.x).toBe(0);
        expect(entity.y).toBe(0);
        expect(entity.width).toBe(1);
        expect(entity.height).toBe(1);

        const [left, right] = entity.children;
        expect(left.x).toBe(0);
        expect(left.y).toBe(0);
        expect(left.width).toBe(1);
        expect(left.height).toBe(0.5);

        expect(right.x).toBe(0);
        expect(right.y).toBe(0.5);
        expect(right.width).toBe(1);
        expect(right.height).toBe(0.5);
    });

    it('should group compose functions', () => {
        expect.assertions(12);

        const location = {
            start: {
                offset: 0,
                line: 0,
                column: 0
            },
            end: {
                offset: 0,
                line: 0,
                column: 0
            }
        };

        const ast = new BinaryOpAST('compose', new ConstantAST('AND', location), new ConstantAST('OR', location), location);
        const renderer = new ASTRenderer();
        const entity = renderer.visit(ast, {
            depthX: 1,
            depthY: 1
        }) as GroupedEntity;

        expect(entity.x).toBe(0);
        expect(entity.y).toBe(0);
        expect(entity.width).toBe(1);
        expect(entity.height).toBe(1);

        const [left, right] = entity.children;
        expect(left.x).toBe(0);
        expect(left.y).toBe(0);
        expect(left.width).toBe(0.5);
        expect(left.height).toBe(1);

        expect(right.x).toBe(0.5);
        expect(right.y).toBe(0);
        expect(right.width).toBe(0.5);
        expect(right.height).toBe(1);
    });

    it('should handle nested expressions', () => {
        expect.assertions(1);

        const location = {
            start: {
                offset: 0,
                line: 0,
                column: 0
            },
            end: {
                offset: 0,
                line: 0,
                column: 0
            }
        };

        const ast = new BinaryOpAST(
            'compose',
            new ConstantAST('ABC', location),
            new BinaryOpAST('tensor', new ConstantAST('DEF', location), new ConstantAST('GHI', location), location),
            location
        );
        const renderer = new ASTRenderer();
        const entity = renderer.visit(ast, {
            depthX: 1,
            depthY: 1
        }) as GroupedEntity;
        expect(entity).toMatchInlineSnapshot(`
            GroupedEntity {
              "children": Array [
                FunctionEntity {
                  "height": 1,
                  "inputs": Array [],
                  "label": [Function],
                  "outputs": Array [],
                  "type": "functionEntity",
                  "width": 0.5,
                  "wires": Array [],
                  "x": 0,
                  "y": 0,
                },
                GroupedEntity {
                  "children": Array [
                    FunctionEntity {
                      "height": 0.5,
                      "inputs": Array [],
                      "label": [Function],
                      "outputs": Array [],
                      "type": "functionEntity",
                      "width": 0.5,
                      "wires": Array [],
                      "x": 0.5,
                      "y": 0,
                    },
                    FunctionEntity {
                      "height": 0.5,
                      "inputs": Array [],
                      "label": [Function],
                      "outputs": Array [],
                      "type": "functionEntity",
                      "width": 0.5,
                      "wires": Array [],
                      "x": 0.5,
                      "y": 0.5,
                    },
                  ],
                  "height": 1,
                  "operator": "tensor",
                  "type": "groupedEntity",
                  "width": 0.5,
                  "wires": Array [],
                  "x": 0.5,
                  "y": 0,
                },
              ],
              "height": 1,
              "operator": "compose",
              "type": "groupedEntity",
              "width": 1,
              "wires": Array [],
              "x": 0,
              "y": 0,
            }
        `);
    });

    it('should throw error with unexpected operator', () => {
        expect.assertions(1);
        const location = {
            start: {
                offset: 0,
                line: 0,
                column: 0
            },
            end: {
                offset: 0,
                line: 0,
                column: 0
            }
        };
        const operator = 'operator does not exist' as BinaryOpeators;
        expect.assertions(1);
        const ast = new BinaryOpAST(operator, new ConstantAST('ABC', location), new ConstantAST('DEF', location), location);

        const renderer = new ASTRenderer();

        expect(() => renderer.visit(ast, {
            depthX: 1,
            depthY: 1
        })).toThrow(buildNotImplementedError(operator));
    });

    it.each([['visitIdentifier'], ['visitLet'], ['visitUnaryOperator']])(
        'should throw error when calling %s method',
        (methodName: string) => {
            const ast = new ASTRenderer();
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            const method = (ast as any)[methodName] as () => void;

            expect(() => method()).toThrow(expect.anything());
        }
    );
});
