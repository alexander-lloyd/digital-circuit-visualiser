import {Hyper} from './hypernet';

type PositionalData = {
    x: number;
    y: number;
    inputPositions: number[];
    outputPositions: number[];
};

export type HyperPositional = Hyper<PositionalData>;

/**
 * Compute the positions of input and outputs on a function
 * on the unit square.
 *
 * E.g a function with one input should have its input position 0.5 on the left side.
 * We implicitly know its on the input side of the unit square.
 *
 * @param count The number of wires.
 * @returns An array of the position of the wires on the unit square.
 */
export function computePosition(count: number): number[] {
    const unitSize = 1.0;
    const array: number[] = new Array(count).
        fill(0).
        map((_, index) => unitSize * (index + 1) / (count + 1));
    return array;
}

/**
 * Populate the positional data into a hypernet so that it is ready
 * for rendering.
 *
 * Assume the function is in the middle of the square. Then get the
 * number of inputs and output and position them equally along the
 * sides.
 *
 * @param hyper Hypernet.
 * @returns The same hypernet with the populated positional data.
 */
export function populateHyperPositional<T>(hyper: HyperPositional): HyperPositional {
    hyper.data = {
        x: 0.5,
        y: 0.5,
        inputPositions: computePosition(hyper.input.sources.length),
        outputPositions: computePosition(hyper.output.targets.length)

    };

    return hyper;
}
