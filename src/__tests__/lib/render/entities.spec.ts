import {
    FunctionEntity,
    GroupedEntity,
    isFunctionEntity,
    isGroupedEntity
} from '../../../lib/render/entities';

describe('function entity', () => {
    it('should scale a function entity', () => {
        expect.assertions(4);

        const entity = new FunctionEntity(5, 6, 8, 10, () => {}, [], [], []);
        entity.scale(0.5, 2);
        expect(entity.x).toBe(5);
        expect(entity.y).toBe(6);
        expect(entity.width).toBe(4);
        expect(entity.height).toBe(20);
    });

    it('should translate a function entity', () => {
        expect.assertions(4);

        const entity = new FunctionEntity(5, 6, 8, 10, () => {}, [], [], []);
        entity.translate(10, -3);
        expect(entity.x).toBe(15);
        expect(entity.y).toBe(3);
        expect(entity.width).toBe(8);
        expect(entity.height).toBe(10);
    });
});

describe('grouped entity', () => {
    it('should scale a grouped entity', () => {
        expect.assertions(12);

        const left = new FunctionEntity(1, 2, 1, 1, () => {}, [], [], []);
        const right = new FunctionEntity(2, 2, 1, 1, () => {}, [], [], []);
        const entity = new GroupedEntity('compose', 1.5, 2, 2, 1, [left, right], []);

        entity.scale(0.5, 2);
        expect(entity.x).toBe(1.5);
        expect(entity.y).toBe(2);
        expect(entity.width).toBe(1);
        expect(entity.height).toBe(2);

        expect(left.x).toBe(1);
        expect(left.y).toBe(2);
        expect(left.width).toBe(0.5);
        expect(left.height).toBe(2);

        expect(right.x).toBe(2);
        expect(right.y).toBe(2);
        expect(right.width).toBe(0.5);
        expect(right.height).toBe(2);
    });

    it('should translate a grouped entity', () => {
        expect.assertions(12);

        const left = new FunctionEntity(1, 2, 1, 1, () => {}, [], [], []);
        const right = new FunctionEntity(2, 2, 1, 1, () => {}, [], [], []);
        const entity = new GroupedEntity('compose', 1.5, 2, 2, 1, [left, right], []);

        entity.translate(2, 3);
        expect(entity.x).toBe(3.5);
        expect(entity.y).toBe(5);
        expect(entity.width).toBe(2);
        expect(entity.height).toBe(1);

        expect(left.x).toBe(3);
        expect(left.y).toBe(5);
        expect(left.width).toBe(1);
        expect(left.height).toBe(1);

        expect(right.x).toBe(4);
        expect(right.y).toBe(5);
        expect(right.width).toBe(1);
        expect(right.height).toBe(1);
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
