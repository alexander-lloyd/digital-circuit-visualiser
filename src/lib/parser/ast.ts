/**
 * Base interface for all AST Nodes.
 */
interface AST {
    type: string;
}

/**
 * Interface AST Node.
 */
export interface IdentifierAST extends AST {
    type: 'identifier';
    name: string;
}

/**
 * Constant AST Node.
 * 
 * E.g. AND, OR
 */
export interface ConstantAST extends AST {
    type: 'constant';
    name: string;
}

/**
 * Function Application AST.
 */
export interface ApplicationAST extends AST {
    type: 'application';
    name: string;
    parameters: ExpressionAST[];
}

export type ExpressionAST = ApplicationAST | ConstantAST | IdentifierAST;

/**
 * Let AST Node.
 * E.g. let name = expression in body
 */
export interface LetAST extends AST {
    type: 'let';
    name: IdentifierAST;
    expression: ExpressionAST;
    body: ExpressionAST;
}