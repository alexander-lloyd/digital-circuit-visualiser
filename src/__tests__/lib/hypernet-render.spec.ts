import {computePosition, populateHyperPositional, HyperPositional} from '../../lib/hypernet-render';
import {id} from '../../lib/hypernet';

describe('hypernet-render', () => {
    it.each([
        [0, []],
        [1, [0.5]],
        [2, [1 / 3, 2 / 3]],
        [3, [0.25, 0.5, 0.75]],
        [4, [0.2, 0.4, 0.6, 0.8]]
    ])('should compute position of unique square with %i inputs', (count, expected) => {
        expect.assertions(1);
        const positions = computePosition(count);

        expect(positions).toStrictEqual(expected);
    });

    it('should populate a hypernet', () => {
        expect.assertions(4);
        const net: HyperPositional = id();
        const {
            data: hyperData
        } = populateHyperPositional(net);

        expect(hyperData.x).toBe(0.5);
        expect(hyperData.y).toBe(0.5);
        expect(hyperData.inputPositions).toStrictEqual([0.5]);
        expect(hyperData.outputPositions).toStrictEqual([0.5]);
    });
});
