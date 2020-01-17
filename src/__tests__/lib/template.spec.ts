import {template} from '../../lib/template';

describe('template function', () => {
    it('should allow empty string', () => {
        expect.assertions(1);
        const closure = template``;
        expect(closure()).toStrictEqual('');
    });

    it('should allow no template parameters', () => {
        expect.assertions(1);
        const closure = template`Hello World`;
        expect(closure()).toStrictEqual('Hello World');
    });

    it('should allow es-next template syntax', () => {
        expect.assertions(1);
        const closure = template`Hello ${'world'}`;
        expect(closure({world: 'World'})).toStrictEqual('Hello World');
    });

    it('should be able to use a template variable more than once', () => {
        expect.assertions(1);
        const closure = template`Hello ${'world'} ${'world'}`;
        expect(closure({world: 'World'})).toStrictEqual('Hello World World');
    });
});
