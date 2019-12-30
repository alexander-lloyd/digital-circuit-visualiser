import { Source, EOF, EOL } from './parser';

const stringSource = 'A + B';

describe('Source', () => {
    let source: Source;

    beforeEach(() => {
        source = new Source(stringSource);
    });

    it('should be defined', () => {
        expect(source).toBeTruthy();
    });

    it('.currentChar should return first character', () => {
        const firstCharacter = stringSource[0];

        expect(source.currentChar()).toBe(firstCharacter);
        expect(source.currentChar()).toBe(firstCharacter);
    });

    it('.nextChar should get the next character', () => {
        const secondCharacter = stringSource[1];
        const thirdCharacter = stringSource[2];

        source.currentChar();

        expect(source.nextChar()).toBe(secondCharacter);
        expect(source.nextChar()).toBe(thirdCharacter);
    });

    it('.peekChar should peek at the next character', () => {
        const secondCharacter = stringSource[1];

        source.currentChar();

        expect(source.peekChar()).toBe(secondCharacter);
        expect(source.peekChar()).toBe(secondCharacter);
    });

    it('should return EOF at end of file', () => {
        for (let i = 0; i < 10; i++) {
            source.nextChar();
        }

        expect(source.currentChar()).toBe(EOF);
        expect(source.peekChar()).toBe(EOF);
    });

    it('should handle multiline strings', () => {
        const program: string = ['A', 'B'].join(EOL);
        const source = new Source(program);

        expect(source.currentChar()).toBe('A');
        expect(source.peekChar()).toBe(EOL);
        expect(source.nextChar()).toBe('B');
        expect(source.peekChar()).toBe(EOL);
        expect(source.nextChar()).toBe(EOF);
    });
});