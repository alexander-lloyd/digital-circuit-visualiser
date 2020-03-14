import {
    scaleLineEntry,
    translateLineEntry,
    scaleBezierCurve,
    translateBezierCurve,
    scaleRenderResult,
    transformRenderResult
} from '../../../lib/render/transform';
import {
    LineEntry, Bezier, RenderResults
} from '../../../lib/render/types';

describe('scale line entry', () => {
    it('should scale a line entry', () => {
        expect.assertions(1);
        const line: LineEntry = [[0, 0], [2, 2]];
        expect(scaleLineEntry(line, 4, 5)).toStrictEqual([[0, 0], [8, 10]]);
    });

    it('should scale a line entry 2', () => {
        expect.assertions(1);
        const line: LineEntry = [[5, 12], [2, 2]];
        expect(scaleLineEntry(line, 2, 2)).toStrictEqual([[10, 24], [4, 4]]);
    });
});

describe('translate line entry', () => {
    it('should translate a line entry', () => {
        expect.assertions(1);
        const line: LineEntry = [[0, 0], [2, 2]];
        expect(translateLineEntry(line, 4, 5)).toStrictEqual([[4, 5], [6, 7]]);
    });

    it('should translate a line entry 2', () => {
        expect.assertions(1);
        const line: LineEntry = [[5, 12], [2, 2]];
        expect(translateLineEntry(line, 2, 2)).toStrictEqual([[7, 14], [4, 4]]);
    });
});

describe('scale bezier curve', () => {
    it('should scale a bezier curve', () => {
        expect.assertions(1);
        const bezier: Bezier = [[0, 0], [2, 2], [3, 5], [6, 7]];
        expect(scaleBezierCurve(bezier, 4, 5)).toStrictEqual([[0, 0], [8, 10], [12, 25], [24, 35]]);
    });
});

describe('translate bezier curve', () => {
    it('should translate a bezier curve', () => {
        expect.assertions(1);
        const bezier: Bezier = [[0, 0], [2, 2], [1, 2], [0, 0]];
        expect(translateBezierCurve(bezier, 4, 5)).toStrictEqual([[4, 5], [6, 7], [5, 7], [4, 5]]);
    });
});

describe('scale render result', () => {
    it('should return an empty renderer result when given an empty one', () => {
        expect.assertions(1);
        const renderResult: RenderResults = {
            beziers: [],
            boxes: [],
            labels: [],
            lines: [],
            curves: [],
            size: [1, 1]
        };

        expect(scaleRenderResult(renderResult, 2, 2)).toStrictEqual({
            beziers: [],
            boxes: [],
            labels: [],
            lines: [],
            curves: [],
            size: [2, 2]
        });
    });

    it('should scale a box around the origin', () => {
        expect.assertions(1);
        const mockLabel = (): void => {};
        const renderResult: RenderResults = {
            beziers: [],
            boxes: [[[0, 0], [1, 1], true]],
            labels: [[mockLabel, [0, 0], 0, 0]],
            lines: [],
            curves: [],
            size: [5, 5]
        };

        expect(scaleRenderResult(renderResult, 2, 2)).toStrictEqual({
            beziers: [],
            boxes: [[[0, 0], [2, 2], true]],
            labels: expect.anything(),
            lines: [],
            curves: [],
            size: [10, 10]
        });
    });

    it('should scale a box off the origin', () => {
        expect.assertions(1);
        const mockLabel = (): void => {};
        const renderResult: RenderResults = {
            beziers: [],
            boxes: [[[1, 1], [2, 2], true]],
            labels: [[mockLabel, [0, 0], 0, 0]],
            lines: [],
            curves: [],
            size: [1, 1]
        };

        expect(scaleRenderResult(renderResult, 2, 2)).toStrictEqual({
            beziers: [],
            boxes: [[[2, 2], [4, 4], true]],
            labels: expect.anything(),
            lines: [],
            curves: [],
            size: [2, 2]
        });
    });

    it('should scale a label on the origin', () => {
        expect.assertions(1);
        const mockLabel = (): void => {};
        const renderResult: RenderResults = {
            beziers: [],
            boxes: [[[-1, -1], [1, 1], true]],
            labels: [[mockLabel, [0, 0], 0, 0]],
            lines: [],
            curves: [],
            size: [1, 1]
        };

        expect(scaleRenderResult(renderResult, 2, 5)).toStrictEqual({
            beziers: [],
            boxes: [[[-2, -5], [2, 5], true]],
            labels: [[mockLabel, [0, 0], 0, 0]],
            lines: [],
            curves: [],
            size: [2, 5]
        });
    });

    it('should scale a label off the origin', () => {
        expect.assertions(1);
        const mockLabel = (): void => {};
        const renderResult: RenderResults = {
            beziers: [],
            boxes: [[[4, 4], [6, 6], true]],
            labels: [[mockLabel, [5, 5], 0, 0]],
            lines: [],
            curves: [],
            size: [1, 1]
        };

        expect(scaleRenderResult(renderResult, 2, 5)).toStrictEqual({
            beziers: [],
            boxes: [[[8, 20], [12, 30], true]],
            labels: [[mockLabel, [10, 25], 0, 0]],
            lines: [],
            curves: [],
            size: [2, 5]
        });
    });
});