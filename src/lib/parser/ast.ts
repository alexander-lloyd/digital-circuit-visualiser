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
     * @returns Return value of visitConstant.
     */
    public visit<T, R>(visitor: ASTVisitor<T, R>, context: T): R {
        return visitor.visitConstant(this, context);
    }
}

export type UnaryOperators = 'feedback';

/**
 * Unary Operator AST.
 */
export class UnaryOpAST implements AST {
    public readonly type = 'unary';
    private readonly _operator: UnaryOperators;
    private readonly _child: AST;

    /**
     * Constructor
     *
     * @param operator Unary operator. E.g. 'feedback'.
     * @param child Child AST Node.
     */
    public constructor(operator: UnaryOperators, child: AST) {
        this._operator = operator;
        this._child = child;
    }

    /**
     * Get the operator.
     *
     * @returns The operator.
     */
    public get operator(): UnaryOperators {
        return this._operator;
    }

    /**
     * Get the child node.
     *
     * @returns The child node.
     */
    public get child(): AST {
        return this._child;
    }

    /**
     * Visit the unaryOperator visitor method.
     *
     * @param visitor ASTVisitor.
     * @param context ASTVisitor context.
     * @returns Return value of ASTVisitor.visitUnaryOperator
     */
    public visit<T, R>(visitor: ASTVisitor<T, R>, context: T): R {
        return visitor.visitUnaryOperator(this, context);
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
    private readonly _left: AST;
    private readonly _right: AST;

    /**
     * Constructor.
     *
     * @param operator The operator.
     * @param left Left side of binary operator.
     * @param right Right side of binary operator.
     */
    public constructor(operator: BinaryOpeators, left: AST, right: AST) {
        this._operator = operator;
        this._left = left;
        this._right = right;
    }

    /**
     * Get the operator.
     *
     * @returns The operator.
     */
    public get operator(): BinaryOpeators {
        return this._operator;
    }

    /**
     * Get the left side.
     *
     * @returns The left side.
     */
    public get left(): AST {
        return this._left;
    }

    /**
     * Get the right side.
     *
     * @returns The right side.
     */
    public get right(): AST {
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

/**
 * Let AST Node.
 * E.g. let name = expression in body
 */
export class LetAST implements AST {
    public readonly type = 'let';
    _name: IdentifierAST;
    _expression: AST;
    _body: AST;

    /**
     * Constructor.
     *
     * @param name Let binding variable name.
     * @param expression Expression.
     * @param body Let binding body.
     */
    public constructor(name: IdentifierAST, expression: AST, body: AST) {
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
    public get expression(): AST {
        return this._expression;
    }

    /**
     * Get the body.
     *
     * @returns The body expression.
     */
    public get body(): AST {
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
 * Is this AST node a Unary node?
 *
 * @param ast AST Node.
 * @returns True if AST node is a unary node.
 */
export function isUnaryOp(ast: AST): ast is UnaryOpAST {
    return ast.type === 'unary';
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
    abstract visitUnaryOperator(ast: UnaryOpAST, context: T): R;
    abstract visitBinaryOperator(ast: BinaryOpAST, context: T): R;
    abstract visitLet(ast: LetAST, context: T): R;
}
