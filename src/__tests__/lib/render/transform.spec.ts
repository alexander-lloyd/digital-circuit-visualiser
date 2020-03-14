import {
    scaleLineEntry,
    translateLineEntry,
    scaleBezierCurve,
    translateBezierCurve
} from '../../../lib/render/transform';
import {
    LineEntry, Bezier
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
