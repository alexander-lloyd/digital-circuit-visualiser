import {
    ASTOptimisingTransformer,
    ASTOptimisingTransformerContext,
    buildNameErrorMessage
} from '../../../lib/parser/compile';
import {
    LetAST,
    IdentifierAST,
    BinaryOpAST,
    ConstantAST,
    isBinaryOp,
    isConstant
} from '../../../lib/parser/index';

describe('optimising ast transformer', () => {
    it('should optimise a let statement', () => {
        expect.assertions(5);
        const ast = new LetAST(
            new IdentifierAST('x'),
            new BinaryOpAST(
                'tensor',
                new ConstantAST('AND'),
                new ConstantAST('OR')
            ),
            new IdentifierAST('x')
        );

        const transformer = new ASTOptimisingTransformer();
        const context: ASTOptimisingTransformerContext = {
            identifiers: new Map()
        };

        const newAST = transformer.visit(ast, context);
        expect(isBinaryOp(newAST)).toBe(true);
        const {left, right} = newAST as BinaryOpAST;

        expect(isConstant(left)).toBe(true);
        expect((left as ConstantAST).name).toBe('AND');
        expect(isConstant(right)).toBe(true);
        expect((right as ConstantAST).name).toBe('OR');
    });

    it('should throw an error if variable is not defined in simple expression', () => {
        expect.assertions(1);
        const ast = new IdentifierAST('x');

        const transformer = new ASTOptimisingTransformer();
        const context: ASTOptimisingTransformerContext = {
            identifiers: new Map()
        };
        expect(() => transformer.visit(ast, context)).toThrow(buildNameErrorMessage('x'));
    });

    it('should throw an error if variable is not defined in complex expression', () => {
        expect.assertions(1);
        const ast = new LetAST(
            new IdentifierAST('x'),
            new BinaryOpAST(
                'tensor',
                new ConstantAST('AND'),
                new ConstantAST('OR')
            ),
            new IdentifierAST('y')
        );

        const transformer = new ASTOptimisingTransformer();
        const context: ASTOptimisingTransformerContext = {
            identifiers: new Map()
        };
        expect(() => transformer.visit(ast, context)).toThrow(buildNameErrorMessage('y'));
    });
});
