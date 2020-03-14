import {
    FunctionEntity,
    GroupedEntity,
    isFunctionEntity,
    isGroupedEntity
} from '../../../lib/render/entities';
import {Point} from '../../../lib/render/types';

describe('function entity', () => {
    it('should scale a function entity', () => {
        expect.assertions(5);

        const entity = new FunctionEntity(5, 6, 8, 10, () => {}, [[[0, 0], [1, 1], [2, 2], [3, 3]]], [], []);
        entity.scale(0.5, 2);
        expect(entity.x).toBe(5);
        expect(entity.y).toBe(6);
        expect(entity.width).toBe(4);
        expect(entity.height).toBe(20);
        expect(entity.wires).toStrictEqual([[[0, 0], [0.5, 2], [1, 4], [1.5, 6]]]);
    });

    it('should translate a function entity', () => {
        expect.assertions(5);

        const entity = new FunctionEntity(5, 6, 8, 10, () => {}, [[[0, 0], [1, 1], [2, 2], [3, 3]]], [], []);
        entity.translate(10, -3);
        expect(entity.x).toBe(15);
        expect(entity.y).toBe(3);
        expect(entity.width).toBe(8);
        expect(entity.height).toBe(10);
        expect(entity.wires).toStrictEqual([[[10, -3], [11, -2], [12, -1], [13, 0]]]);
    });
});

describe('grouped entity', () => {
    it('should scale a grouped entity', () => {
        expect.assertions(14);

        const left = new FunctionEntity(1, 2, 1, 1, () => {}, [], [], []);
        const right = new FunctionEntity(2, 2, 1, 1, () => {}, [], [], []);
        const entity = new GroupedEntity('compose', 1.5, 2, 2, 1, [left, right], [[[0, 0], [1, 1], [2, 2], [3, 3]]]);

        entity.scale(0.5, 2);
        expect(entity.x).toBe(1.5);
        expect(entity.y).toBe(2);
        expect(entity.width).toBe(1);
        expect(entity.height).toBe(2);
        expect(entity.wires).toStrictEqual([[[0, 0], [0.5, 2], [1, 4], [1.5, 6]]]);

        expect(left.x).toBe(1);
        expect(left.y).toBe(2);
        expect(left.width).toBe(0.5);
        expect(left.height).toBe(2);

        expect(right.x).toBe(2);
        expect(right.y).toBe(2);
        expect(right.width).toBe(0.5);
        expect(right.height).toBe(2);
        expect(right.wires).toHaveLength(0);
    });

    it('should translate a grouped entity', () => {
        expect.assertions(14);

        const left = new FunctionEntity(1, 2, 1, 1, () => {}, [], [], []);
        const right = new FunctionEntity(2, 2, 1, 1, () => {}, [], [], []);
        const entity = new GroupedEntity('compose', 1.5, 2, 2, 1, [left, right], [[[0, 0], [1, 1], [2, 2], [3, 3]]]);

        entity.translate(2, 3);
        expect(entity.x).toBe(3.5);
        expect(entity.y).toBe(5);
        expect(entity.width).toBe(2);
        expect(entity.height).toBe(1);
        expect(entity.wires).toStrictEqual([[[2, 3], [3, 4], [4, 5], [5, 6]]]);

        expect(left.x).toBe(3);
        expect(left.y).toBe(5);
        expect(left.width).toBe(1);
        expect(left.height).toBe(1);

        expect(right.x).toBe(4);
        expect(right.y).toBe(5);
        expect(right.width).toBe(1);
        expect(right.height).toBe(1);
        expect(right.wires).toHaveLength(0);
    });

    it('should return all children inputs and outputs', () => {
        expect.assertions(2);
        const leftInputs: Point[] = [[0, 0], [1, 1]];
        const rightInputs: Point[] = [[0, 0], [1, 1]];
        const leftOutputs: Point[] = [];
        const rightOutputs: Point[] = [[1, 2]];
        const left = new FunctionEntity(1, 2, 1, 1, () => {}, [], leftInputs, leftOutputs);
        const right = new FunctionEntity(2, 2, 1, 1, () => {}, [], rightInputs, rightOutputs);
        const entity = new GroupedEntity('compose', 1.5, 2, 2, 1, [left, right], []);

        expect(entity.inputs).toStrictEqual([...leftInputs, ...rightInputs]);
        expect(entity.outputs).toStrictEqual([...leftOutputs, ...rightOutputs]);
    });
});

describe('is function entity', () => {
    it('should return true for a function entity', () => {
        expect.assertions(1);
        const entity = new FunctionEntity(5, 6, 8, 10, () => {}, [], [], []);
        expect(isFunctionEntity(entity)).toBe(true);
    });

    it('should return false for a grouped entity', () => {
        expect.assertions(1);
        const left = new FunctionEntity(1, 2, 1, 1, () => {}, [], [], []);
        const right = new FunctionEntity(2, 2, 1, 1, () => {}, [], [], []);
        const entity = new GroupedEntity('compose', 1.5, 2, 2, 1, [left, right], []);
        expect(isFunctionEntity(entity)).toBe(false);
    });
});

describe('is grouped entity', () => {
    it('should return false for a function entity', () => {
        expect.assertions(1);
        const entity = new FunctionEntity(5, 6, 8, 10, () => {}, [], [], []);
        expect(isGroupedEntity(entity)).toBe(false);
    });

    it('should return true for a grouped entity', () => {
        expect.assertions(1);
        const left = new FunctionEntity(1, 2, 1, 1, () => {}, [], [], []);
        const right = new FunctionEntity(2, 2, 1, 1, () => {}, [], [], []);
        const entity = new GroupedEntity('compose', 1.5, 2, 2, 1, [left, right], []);
        expect(isGroupedEntity(entity)).toBe(true);
    });
});
