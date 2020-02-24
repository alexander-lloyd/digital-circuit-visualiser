import {
    AST,
    ASTVisitor,
    ApplicationAST,
    BinaryOpAST,
    ConstantAST,
    IdentifierAST,
    LetAST
} from './ast';

export type ASTOptimisingTransformerContext = {
    identifiers: Map<string, AST>;
};

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
     * @returns Identifier AST.
     */
    public visitIdentifier(ast: IdentifierAST): AST {
        return ast;
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
     * Visit application. Make no change to node.
     *
     * @param ast AST Node.
     * @param context Visitor Context.
     * @returns AST Node.
     */
    public visitApplication(ast: ApplicationAST, context: ASTOptimisingTransformerContext): AST {
        const {name} = ast;
        const {identifiers} = context;

        const expression = identifiers.get(name);

        if (expression === undefined) {
            throw new Error(`Unknown Identifier '${name}'`);
        }

        return expression;
    }

    /**
     * Visit binary operator. Make no change to node.
     *
     * @param ast AST Node.
     * @returns AST Node.
     */
    public visitBinaryOperator(ast: BinaryOpAST): AST {
        return ast;
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

        return ast.expression.visit(this, context);
    }
}
