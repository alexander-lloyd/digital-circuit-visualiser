import {compile} from '../../lib/parser/index';

import {EXAMPLES} from '../../assets/examples';

const examples: [string][] = Object.values(EXAMPLES).map(e => [e.source]);

describe('examples', () => {
    test.each(examples)('should compile example', (source) => {
        expect(compile(source)).not.toBeNull();
    });
});
