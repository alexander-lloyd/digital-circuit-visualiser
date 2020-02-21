/**
 * Base interface for all AST Nodes.
 */
export interface AST {
    type: string;

    /**
     * Visit the right method in the ASTVisitor.
     *
     * @param visitor ASTVisitor.
     */
    visit<T, R>(visitor: ASTVisitor<T, R>, context: T): R;
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
     * @param context ASTVisitor Context.
     * @returns Return value of visitIdentifier.
     */
    public visit<T, R>(visitor: ASTVisitor<T, R>, context: T): R {
        return visitor.visitIdentifier(this, context);
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
     * @param context ASTVisitor context.
     * @returns REturn value of visitConstant.
     */
    public visit<T, R>(visitor: ASTVisitor<T, R>, context: T): R {
        return visitor.visitConstant(this, context);
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
     * @param context ASTVisitor context.
     * @returns Return value of visitApplicationAST.
     */
    public visit<T, R>(visitor: ASTVisitor<T, R>, context: T): R {
        return visitor.visitApplication(this, context);
    }
}

export type BinaryOpeators = 'tensor' | 'compose';

/**
 * Binary Operator AST Node.
 *
 * E.g. A tensor B.
 */
export class BinaryOpAST implements AST {
    public readonly type = 'binary';
    private readonly _operator: BinaryOpeators;
    private readonly _left: ExpressionAST;
    private readonly _right: ExpressionAST;

    /**
     * Constructor.
     *
     * @param operator The operator.
     * @param left Left side of binary operator.
     * @param right Right side of binary operator.
     */
    public constructor(operator: BinaryOpeators, left: ExpressionAST, right: ExpressionAST) {
        this._operator = operator;
        this._left = left;
        this._right = right;
    }

    /**
     * Get the operator.
     *
     * @returns The operator.
     */
    public get operator(): string {
        return this._operator;
    }

    /**
     * Get the left side.
     *
     * @returns The left side.
     */
    public get left(): ExpressionAST {
        return this._left;
    }

    /**
     * Get the right side.
     *
     * @returns The right side.
     */
    public get right(): ExpressionAST {
        return this._right;
    }

    /**
     * Visit the binaryOperator visitor method.
     *
     * @param visitor ASTVisitor.
     * @param context ASTVisitor context.
     * @returns Return value of ASTVisitor.visitBinaryOperator
     */
    public visit<T, R>(visitor: ASTVisitor<T, R>, context: T): R {
        return visitor.visitBinaryOperator(this, context);
    }
}

export type ExpressionAST = ApplicationAST | BinaryOpAST | ConstantAST | IdentifierAST;

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
     * @param context ASTVisotor Context.
     * @returns Return value of ASTVisitor.visitExpression
     */
    public visit<T, R>(visitor: ASTVisitor<T, R>, context: T): R {
        return visitor.visitLet(this, context);
    }
}

/**
 * Is this AST node an Identifier?
 *
 * @param ast AST Node.
 * @returns True if AST node is an identifier node.
 */
export function isIdentifier(ast: AST): ast is IdentifierAST {
    return ast.type === 'identifier';
}

/**
 * Is this AST node a Constant?
 *
 * @param ast AST Node.
 * @returns True if AST node is a constant node.
 */
export function isConstant(ast: AST): ast is ConstantAST {
    return ast.type === 'constant';
}

/**
 * Is this AST node an Application node?
 *
 * @param ast AST Node.
 * @returns True if AST node is an application node.
 */
export function isApplication(ast: AST): ast is ApplicationAST {
    return ast.type === 'application';
}

/**
 * Is this AST node a Binary node?
 *
 * @param ast AST Node.
 * @returns True if AST node is a binary node.
 */
export function isBinaryOp(ast: AST): ast is BinaryOpAST {
    return ast.type === 'binary';
}

/**
 * Is this AST node an Expression node?
 *
 * @param ast AST Node.
 * @returns True if AST node is an expression node.
 */
export function isExpression(ast: AST): ast is ExpressionAST {
    return isApplication(ast) || isBinaryOp(ast) || isConstant(ast) || isIdentifier(ast);
}

/**
 * Is this AST node a Let node?
 *
 * @param ast AST Node.
 * @returns True if AST node is a let node.
 */
export function isLet(ast: AST): ast is LetAST {
    return ast.type === 'let';
}

/**
 * ASTVisitor.
 */
export abstract class ASTVisitor<T, R> {
    /**
     * Visit an AST node.
     *
     * @param ast AST Node.
     * @param context Context required while visiting.
     * @returns What ever the ASTVisitor returns.
     */
    public visit(ast: AST, context: T): R {
        return ast.visit<T, R>(this, context);
    }

    abstract visitIdentifier(ast: IdentifierAST, context: T): R;
    abstract visitConstant(ast: ConstantAST, context: T): R;
    abstract visitApplication(ast: ApplicationAST, context: T): R;
    abstract visitBinaryOperator(ast: BinaryOpAST, context: T): R;
    abstract visitLet(ast: LetAST, context: T): R;
}
