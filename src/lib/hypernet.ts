import Assert from "assert";


export type Flat = string;

/**
 * A label on a Hypernet. Either a string e.g. 'f'
 * or can be expanded to another Hypernet.
 * 
 * Similar to a circuit, E.g. an AND gate. We can have
 * represent an AND gate as an integrated circuit (string)
 * or as transistors (Hypernet).
 */
export type Label<T> = Flat | Hyper<T>;

/**
 * A Hypernet can be made of a set of inputs and outputs.
 */
export interface Hyper<T> {
    input: Edge<T>;
    edges: Edge<T>[];
    output: Edge<T>;
}

/**
 * 
 */
export interface Edge<T> {
    sources: [Edge<T>, number][];
    targets: [Edge<T>, number][];
    label: Label<T>;
}

/**
 * Create an id. A wire.
 *
 * @returns Hypernet representing a wire.
 */
export function id<T>(): Hyper<T> {
    const ie: Edge<T> = {
        sources: [],
        targets: [],
        label: ''
    };
    const oe: Edge<T> = {
        sources: [],
        targets: [],
        label: ''
    };

    ie.sources.push([oe, 0]);
    oe.targets.push([ie, 0]);

    return {
        input: ie,
        edges: [],
        output: oe
    };
}

/**
 * Represents a swap in wires.
 *
 * @returns A swap.
 * 
 * A _  _ C
 *    \/
 * B _/\_ D
 */
export function swap<T>(): Hyper<T> {
    const ie: Edge<T> = {
        sources: [],
        targets: [],
        label: ''
    };
    const oe: Edge<T> = {
        sources: [],
        targets: [],
        label: ''
    };
    ie.sources.push([oe, 1], [oe, 0]);
    oe.targets.push([ie, 1], [ie, 0]);

    return {
        input: ie,
        edges: [],
        output: oe
    };
}

/**
 * Compose two hypernets together.
 * 
 * Technically, the labels need to match as well.
 * This has not been implemented.
 * 
 * Careful: this modifies arguments f and g, if you don't want
 * to you need to copy them. 
 *
 * @param f Function f.
 * @param g Function g.
 * @returns Hypernet composing two functions together
 * @throws AssertionError if f.outputs.length == f.inputs.length
 * 
 *   ┌───┐  ┌───┐
 *  ─┤   ├──┤   ├─
 *  ─┤ f ├──┤ g ├─
 *  ─┤   ├──┤   ├─
 *   └───┘  └───┘
 */
export function compose<T>(f: Hyper<T>, g: Hyper<T>): Hyper<T> {
    if (!f || !g) {
        throw Error(`Invalid input ${f},${g} into compose function`);
    }

    // Check output length is equal to input length.
    Assert.equal(f.output.targets.length, g.input.sources.length, 'Input length must be equal to output length');
    for (let i = 0; i < f.output.targets.length; ++i) {
        const [e, k] = f.output.targets[i];
        const [e2, k2] = g.input.sources[i];
        e.sources[k] = [e2, k2];
        e2.targets[k2] = [e, k];
    }

    return {
        input: f.input,
        edges: [...f.edges, ...g.edges],
        output: g.output
    };
}
