import {
    AST,
    BinaryOpAST,
    ConstantAST,
    IdentifierAST,
    LetAST,
    UnaryOpAST,
    isBinaryOp,
    isConstant,
    isExpression,
    isIdentifier,
    isLet,
    isUnaryOp
} from '../../../lib/parser/ast';

describe('ast', () => {
    it.each([
        [new IdentifierAST('abc'), 'identifier'],
        [new ConstantAST(''), 'constant'],
        [new UnaryOpAST('feedback', new ConstantAST('')), 'unary'],
        [new BinaryOpAST('compose', new ConstantAST(''), new ConstantAST('')), 'binary'],
        [new LetAST(new IdentifierAST(''), new ConstantAST(''), new ConstantAST('')), 'let']
    ])('%s should return type %s', (ast, type) => {
        expect(ast.type).toBe(type);
    });

    it.each([
        [isIdentifier, new IdentifierAST('abc')],
        [isConstant, new ConstantAST('')],
        [isUnaryOp, new UnaryOpAST('feedback', new ConstantAST(''))],
        [isBinaryOp, new BinaryOpAST('compose', new ConstantAST(''), new ConstantAST(''))],
        [isLet, new LetAST(new IdentifierAST(''), new ConstantAST(''), new ConstantAST(''))],
        [isExpression, new IdentifierAST('abc')],
        [isExpression, new ConstantAST('ABC')],
        [isExpression, new UnaryOpAST('feedback', new IdentifierAST('abc'))],
        [isExpression, new BinaryOpAST('compose', new ConstantAST(''), new ConstantAST(''))]
    ])('%s(%s) -> true', (isFunc: (ast: AST) => boolean, ast: AST) => {
        expect(isFunc(ast)).toBe(true);
    });
});
