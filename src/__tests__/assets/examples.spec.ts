import {compile} from '../../lib/parser/index';

import {EXAMPLES} from '../../assets/examples';
import {Render} from '../../lib/render';

const examples: [string][] = Object.values(EXAMPLES).map((e) => [e.source]);

describe('examples', () => {
    it.each(examples)('should compile example %s', (source) => {
        expect(compile(source)).not.toBeNull();
    });

    it.each(examples)('should generate a structure from %s', (source) => {
        const ast = compile(source);
        const renderer = new Render();
        const context = {
            featureFlags: {}
        };
        expect(renderer.visit(ast, context)).not.toBeNull();
    });
});
