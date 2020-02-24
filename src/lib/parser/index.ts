import {AST} from './ast';
import {parse as parse$} from './parser';
import {
    ASTOptimisingTransformer,
    ASTOptimisingTransformerContext
} from './compile';

/**
 * Parse a string.
 *
 * @param source The source.
 * @returns AST Tree.
 */
export function parse(source: string): AST {
    return parse$(source) as AST;
}

/**
 * Parse and apply optimisations to the AST.
 * @param source Source Code.
 * @returns AST Tree.
 */
export function compile(source: string): AST {
    const ast = parse(source);
    const optimiserContext: ASTOptimisingTransformerContext = {
        identifiers: new Map()
    };
    const optimiser = new ASTOptimisingTransformer();
    const optimised = ast.visit(optimiser, optimiserContext);

    return optimised;
}

export * from './ast';
