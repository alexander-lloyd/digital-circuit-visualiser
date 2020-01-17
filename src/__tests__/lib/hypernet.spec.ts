import {AssertionError} from 'assert';

import {
    id, swap, compose
} from '../../lib/hypernet';

describe('hypernets Module', () => {
    describe('id function', () => {
        it('should return an identity', () => {
            expect.assertions(4);

            const hypernet = id<number>();
            const ie = hypernet.input;
            const oe = hypernet.output;

            expect(ie.targets).toStrictEqual([]);
            expect(oe.sources).toStrictEqual([]);

            expect(ie.sources[0][0]).toBe(oe);
            expect(oe.targets[0][0]).toBe(ie);
        });
    });

    describe('swap', () => {
        it('should create a swap', () => {
            expect.assertions(4);
            const {input, output} = swap();

            expect(input.targets).toStrictEqual([]);
            expect(output.sources).toStrictEqual([]);

            expect(input.sources).toStrictEqual([[output, 1], [output, 0]]);
            expect(output.targets).toStrictEqual([[input, 1], [input, 0]]);
        });
    });

    describe('compose', () => {
        it('should throw error trying to compose invalid input', () => {
            expect.assertions(1);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            expect(() => compose(null as any, null as any)).toThrow(Error);
        });

        it('should compose two function', () => {
            expect.assertions(3);
            const f = id();
            const g = id();

            const {input, output, edges} = compose(f, g);
            expect(input).toBe(f.input);
            expect(output).toBe(g.output);
            expect(edges).toStrictEqual([...f.edges, ...g.edges]);
        });

        it('should throw assertion error if output of f != input of g', () => {
            expect.assertions(1);
            const f = id();
            const g = id();

            // Modify f so its output is differnt from g.
            f.output.targets.push([f.output, 1]);

            expect(() => compose(f, g)).toThrow(AssertionError);
        });
    });
});
