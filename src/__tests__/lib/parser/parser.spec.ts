import {compile, parse} from '../../../lib/parser/index';

const cases = [
    ['A'],
    ['AND'],
    ['OR'],
    ['AND * AND'],
    ['AND . OR'],
    ['let x = OR in OR'],
    ['let x = AND . AND in OR'],
    ['let x = AND in x'],
    ['let longVaribableName = AND in AND'],
    ['   let lotsOfWhitespace    = OR  .   AND  \n\n\   in   AND  \n\n '],
    ['let  x = JOIN in x'],
    ['let x = SPLIT in x'],
    ['let x = ( AND . AND ) in (x)'],
    ['let x = (((((AND . AND ))))) in (((((x)))))'],
    ['let x = AND in let y = OR in SPLIT . (x * y) . JOIN'],
    ['feedback AND'],
    ['feedback ASDAS'],
    ['let x = AND in feedback x'],
    ['feedback (AND . OR)'],
    ['feedback (AND * OR)'],
    ['feedback AND . OR'],
    ['feedback AND * OR']
];

describe('parser', () => {
    it.each(cases)('should parse \'%s\'', (source: string): void => {
        expect(parse(source)).not.toBeNull();
    });

    it.each(cases)('should compile \'%s\'', (source: string): void => {
        expect(compile(source)).not.toBeNull();
    });
});
