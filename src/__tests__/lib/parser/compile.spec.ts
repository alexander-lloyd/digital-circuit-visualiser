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
    FileRange,
    isBinaryOp,
    isConstant
} from '../../../lib/parser/index';

describe('optimising ast transformer', () => {
    it('should optimise a let statement', () => {
        expect.assertions(5);
        const location: FileRange = {
            start: {
                column: 1,
                line: 1,
                offset: 1
            },
            end: {
                column: 1,
                line: 1,
                offset: 1
            }
        };
        const ast = new LetAST(
            new IdentifierAST('x', location),
            new BinaryOpAST(
                'tensor',
                new ConstantAST('AND', location),
                new ConstantAST('OR', location),
                location
            ),
            new IdentifierAST('x', location),
            location
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
        const location: FileRange = {
            start: {
                column: 1,
                line: 1,
                offset: 1
            },
            end: {
                column: 1,
                line: 1,
                offset: 1
            }
        };
        const ast = new IdentifierAST('x', location);

        const transformer = new ASTOptimisingTransformer();
        const context: ASTOptimisingTransformerContext = {
            identifiers: new Map()
        };
        expect(() => transformer.visit(ast, context)).toThrow(buildNameErrorMessage('x', location));
    });

    it('should throw an error if variable is not defined in complex expression', () => {
        expect.assertions(1);
        const location: FileRange = {
            start: {
                column: 1,
                line: 1,
                offset: 1
            },
            end: {
                column: 1,
                line: 1,
                offset: 1
            }
        };
        const ast = new LetAST(
            new IdentifierAST('x', location),
            new BinaryOpAST(
                'tensor',
                new ConstantAST('AND', location),
                new ConstantAST('OR', location),
                location
            ),
            new IdentifierAST('y', location),
            location
        );

        const transformer = new ASTOptimisingTransformer();
        const context: ASTOptimisingTransformerContext = {
            identifiers: new Map()
        };
        expect(() => transformer.visit(ast, context)).toThrow(buildNameErrorMessage('y', location));
    });
});
