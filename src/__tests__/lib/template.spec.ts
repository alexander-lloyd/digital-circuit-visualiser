import { template } from '../../lib/template';

describe('template function', () => {
    it('should allow empty string', () => {
        const closure = template``;
        expect(closure()).toEqual('');
    });

    it('should allow no template parameters', () => {
        const closure = template`Hello World`;
        expect(closure()).toEqual('Hello World');
    });

    it('should allow es-next template syntax', () => {
        const closure = template`Hello ${'world'}`;
        expect(closure({world: 'World'})).toEqual('Hello World');
    });

    it('should be able to use a template variable more than once', () => {
        const closure = template`Hello ${'world'} ${'world'}`;
        expect(closure({world: 'World'})).toEqual('Hello World World');
    });
});
