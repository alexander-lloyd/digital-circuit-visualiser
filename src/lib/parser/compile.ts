import {
    AST,
    ASTVisitor,
    BinaryOpAST,
    ConstantAST,
    ExpressionAST,
    IdentifierAST,
    LetAST,
    UnaryOpAST
} from './ast';

export type ASTOptimisingTransformerContext = {
    identifiers: Map<string, AST>;
};

/**
 * Error raised when a variable is referenced but not
 * defined in the map identifiers.
 */
export class NameError extends Error {}

/**
 * Build error message.
 *
 * @param name variable name to include in message.
 * @returns Error message.
 */
export function buildNameErrorMessage(name: string): string {
    return `ASTOptimisingTransformer.visitIdentifier got unexpected variable '${name}'`;
}

/**
 * Explore an AST and substitute variables from let bindings with the expression.
 *
 * E.g. let x = 5 in x + x
 * ===> 5 + 5
 */
export class ASTOptimisingTransformer extends ASTVisitor<ASTOptimisingTransformerContext, AST> {
    /**
     * Visit identifier. Make no change to node.
     *
     * @param ast AST Node.
     * @param context ASTOptimising Context.
     * @returns Identifier AST.
     * @throws NameError if a variable is referenced and not defined in the context.
     */
    public visitIdentifier(ast: IdentifierAST, context: ASTOptimisingTransformerContext): AST {
        const {name} = ast;
        const {identifiers} = context;
        const newAST = identifiers.get(name);

        if (newAST === undefined) {
            throw new NameError(buildNameErrorMessage(name));
        }

        return newAST;
    }

    /**
     * Visit constant. Make no change to node.
     *
     * @param ast AST Node.
     * @returns AST Node.
     */
    public visitConstant(ast: ConstantAST): AST {
        return ast;
    }

    /**
     * Visit binary operator. Make no change to node.
     *
     * @param ast AST Node.
     * @param context AST Visitor Context.
     * @returns AST Node.
     */
    public visitBinaryOperator(ast: BinaryOpAST, context: ASTOptimisingTransformerContext): AST {
        const left = ast.left.visit(this, context) as ExpressionAST;
        const right = ast.right.visit(this, context) as ExpressionAST;

        if (left === ast.left && right === ast.right) {
            return ast;
        }

        return new BinaryOpAST(ast.operator, left, right);
    }

    /**
     * Visit let.
     *
     * Going to replace any reference to identifier name in the body
     * with the expression.
     *
     * @param ast AST Node.
     * @param context AST Visitor Context.
     * @returns Optimised AST for rendering.
     */
    public visitLet(ast: LetAST, context: ASTOptimisingTransformerContext): AST {
        const {name} = ast.name;
        const expression = ast.expression.visit(this, context);
        context.identifiers.set(name, expression);

        return ast.body.visit(this, context);
    }

    /**
     * Visit Unary Operator.
     *
     * @param ast UnaryOpAST Node.
     * @param context Optimiser Context.
     * @returns Optmisied AST.
     */
    public visitUnaryOperator(ast: UnaryOpAST, context: ASTOptimisingTransformerContext): AST {
        const {operator, child} = ast;
        const newChild = child.visit(this, context);
        if (newChild !== child) {
            return new UnaryOpAST(operator, newChild as ExpressionAST);
        }
        return ast;
    }
}
