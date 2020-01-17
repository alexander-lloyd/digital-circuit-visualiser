// Based off https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

/**
 * Arbitary key-values pairs in an object.
 */
export interface Dictionary<T> {
    [key: string]: T;
}

export type Template = (dict?: Dictionary<string>) => string;

/**
 * Create a template. Returns a closure which if given a
 * dictionary returns a formatted string.
 *
 * @param strings A string template literal.
 * @param keys String literal key.
 * @returns A closure which if given a dictionary returns a formatted string.
 *
 * @example
 *
 *     template`Hello ${'world'}`({world: 'World'})
 *     'Hello World'
 */
export function template(strings: TemplateStringsArray, ...keys: string[]): Template {
    return (dict: Dictionary<string> = {}): string => {
        const result = [strings[0]];

        keys.forEach((key: string, i: number) => {
            const value = dict[key];
            result.push(value, strings[i + 1]);
        });

        return result.join('');
    };
}
