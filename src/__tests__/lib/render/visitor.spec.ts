import {
    ASTRenderer
} from '../../../lib/render/visitor';
import {
    ConstantAST, BinaryOpAST
} from '../../../lib/parser/ast';
import {GroupedEntity} from 'lib/render/entities';

describe('ast renderer', () => {
    it('should create a function entity', () => {
        expect.assertions(4);

        const ast = new ConstantAST('AND');
        const renderer = new ASTRenderer();
        const entity = renderer.visit(ast, null);

        expect(entity.x).toBe(0);
        expect(entity.y).toBe(0);
        expect(entity.width).toBe(1);
        expect(entity.height).toBe(1);
    });

    it('should group tensor functions', () => {
        expect.assertions(12);

        const ast = new BinaryOpAST(
            'tensor',
            new ConstantAST('AND'),
            new ConstantAST('OR')
        );
        const renderer = new ASTRenderer();
        const entity = renderer.visit(ast, null) as GroupedEntity;

        expect(entity.x).toBe(0);
        expect(entity.y).toBe(0);
        expect(entity.width).toBe(1);
        expect(entity.height).toBe(1);

        const [left, right] = entity.children;
        expect(left.x).toBe(0);
        expect(left.y).toBe(0.5);
        expect(left.width).toBe(1);
        expect(left.height).toBe(0.5);

        expect(right.x).toBe(0);
        expect(right.y).toBe(-0.5);
        expect(right.width).toBe(1);
        expect(right.height).toBe(0.5);
    });

    it('should group compose functions', () => {
        expect.assertions(12);

        const ast = new BinaryOpAST(
            'compose',
            new ConstantAST('AND'),
            new ConstantAST('OR')
        );
        const renderer = new ASTRenderer();
        const entity = renderer.visit(ast, null) as GroupedEntity;

        expect(entity.x).toBe(0);
        expect(entity.y).toBe(0);
        expect(entity.width).toBe(1);
        expect(entity.height).toBe(1);

        const [left, right] = entity.children;
        expect(left.x).toBe(-0.5);
        expect(left.y).toBe(0);
        expect(left.width).toBe(0.5);
        expect(left.height).toBe(1);

        expect(right.x).toBe(0.5);
        expect(right.y).toBe(0);
        expect(right.width).toBe(0.5);
        expect(right.height).toBe(1);
    });
});
