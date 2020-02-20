/**
 * Base interface for all AST Nodes.
 */
interface AST {
    type: string;

    /**
     * Visit the right method in the ASTVisitor.
     *
     * @param visitor ASTVisitor.
     */
    visit<R>(visitor: ASTVisitor<R>): R;
}

/**
 * Interface AST Node.
 */
export class IdentifierAST implements AST {
    public readonly type = 'identifier';
    private readonly _name: string;

    /**
     * Constructor.
     *
     * @param name Identifier name.
     */
    public constructor(name: string) {
        this._name = name;
    }

    /**
     * Get the name of the identifier.
     *
     * @returns The name of the identifier.
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Visit the identifier in the AST Visitor.
     *
     * @param visitor AST Visitor.
     * @returns Return value of visitIdentifier.
     */
    public visit<R>(visitor: ASTVisitor<R>): R {
        return visitor.visitIdentifier(this);
    }
}

/**
 * Constant AST Node.
 * 
 * E.g. AND, OR
 */
export class ConstantAST implements AST {
    public readonly type = 'constant';
    private readonly _name: string;

    /**
     * Constructor.
     *
     * @param name Constant name.
     */
    public constructor(name: string) {
        this._name = name;
    }
    
    /**
     * Get the name of the identifier.
     *
     * @returns The name of the identifier.
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Visit the constant in the AST Visitor.
     *
     * @param visitor AST Visitor.
     * @returns REturn value of visitConstant.
     */
    public visit<R>(visitor: ASTVisitor<R>): R {
        return visitor.visitConstant(this);
    }
}

/**
 * Function Application AST.
 */
export class ApplicationAST implements AST {
    public readonly type = 'application';
    private _name: string;
    private _parameters: ExpressionAST[];

    /**
     * Constructor.
     *
     * @param name Function name.
     * @param parameters Parameters list.
     */
    public constructor(name: string, parameters: ExpressionAST[]) {
        this._name = name;
        this._parameters = parameters;
    }

    /**
     * Visit the application in the AST Visitor.
     *
     * @param visitor AST Visitor.
     * @returns Return value of visitApplicationAST.
     */
    public visit<R>(visitor: ASTVisitor<R>): R {
        return visitor.visitApplication(this);
    }
}

export type ExpressionAST = ApplicationAST | ConstantAST | IdentifierAST;

/**
 * Let AST Node.
 * E.g. let name = expression in body
 */
export class LetAST implements AST {
    public readonly type = 'let';
    _name: IdentifierAST;
    _expression: ExpressionAST;
    _body: ExpressionAST;

    /**
     * Constructor.
     *
     * @param name Let binding variable name.
     * @param expression Expression.
     * @param body Let binding body.
     */
    public constructor(name: IdentifierAST, expression: ExpressionAST, body: ExpressionAST) {
        this._name = name;
        this._expression = expression;
        this._body = body;
    }

    /**
     * Get the name.
     * 
     * @returns The variable name.
     */
    public get name(): IdentifierAST {
        return this._name;
    }

    /**
     * Get the Expression.
     * 
     * @returns The expression node.
     */
    public get expression(): ExpressionAST {
        return this._expression;
    }

    /**
     * Get the body.
     * 
     * @returns The body expression.
     */
    public get body(): ExpressionAST {
        return this._body;
    }

    /**
     * Visit the ASTVisitor.visitExpression.
     *
     * @param visitor ASTVisitor.
     * @returns Return value of ASTVisitor.visitExpression
     */
    public visit<R>(visitor: ASTVisitor<R>): R {
        return visitor.visitLet(this);
    }
}

/**
 * ASTVisitor.
 */
abstract class ASTVisitor<R> {
    /**
     * Visit an AST node.
     *
     * @param ast AST Node.
     * @returns What ever the ASTVisitor returns.
     */
    public visit(ast: AST): R {
        return ast.visit<R>(this);
    }

    abstract visitIdentifier(ast: IdentifierAST): R;
    abstract visitConstant(ast: ConstantAST): R;
    abstract visitApplication(ast: ApplicationAST): R;
    abstract visitLet(ast: LetAST): R;
}