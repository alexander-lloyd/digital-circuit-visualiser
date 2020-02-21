import {parse as parse$} from './parser';
import {AST} from './ast';

/**
 * Parse a string.
 *
 * @param source The source.
 * @returns AST Tree.
 */
export function parse(source: string): AST {
    return parse$(source) as AST;
}

export * from './ast';
