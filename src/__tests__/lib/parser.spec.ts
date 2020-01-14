import { Source, EOF, EOL, isLetter, isNumeric, LanguageScanner, Token, TokenType, isWhitespace } from '../../lib/parser';

const stringSource = 'A + B';

describe('parser module', () => {
    it.each([
        ['A', true],
        ['B', true],
        ['c', true],
        ['/', false],
        [':', false],
        ['', false]
    ])('should isLetter(%c)? %b', (char, isChar) => {
        expect(isLetter(char)).toBe(isChar);
    });

    it.each([
        ['1', true],
        ['2', true],
        ['9', true],
        ['a', false],
        ['Z', false],
        ['', false]
    ])('should isNumeric(%c)? %b', (char, isChar) => {
        expect(isNumeric(char)).toBe(isChar);
    });

    it.each([
        [' ', true],
        ['\t', true],
        ['\n', true],
        ['a', false],
        ['4', false],
        ['', false]
    ])('should isWhitespace(%c)? %b', (char, isChar) => {
        expect(isWhitespace(char)).toBe(isChar);
    });

    describe('source object', () => {
        it('.currentChar should return first character', () => {
            expect.assertions(2);
            const source = new Source(stringSource);
            const firstCharacter = stringSource[0];

            expect(source.currentChar()).toBe(firstCharacter);
            expect(source.currentChar()).toBe(firstCharacter);
        });

        it('.nextChar should get the next character', () => {
            expect.assertions(2);
            const source = new Source(stringSource);
            const secondCharacter = stringSource[1];
            const thirdCharacter = stringSource[2];

            source.currentChar();

            expect(source.nextChar()).toBe(secondCharacter);
            expect(source.nextChar()).toBe(thirdCharacter);
        });

        it('.peekChar should peek at the next character', () => {
            expect.assertions(2);
            const source = new Source(stringSource);
            const secondCharacter = stringSource[1];

            source.currentChar();

            expect(source.peekChar()).toBe(secondCharacter);
            expect(source.peekChar()).toBe(secondCharacter);
        });

        it('should return EOF at end of file', () => {
            expect.assertions(2);
            const source = new Source(stringSource);

            for (let i = 0; i < 10; i++) {
                source.nextChar();
            }

            expect(source.currentChar()).toBe(EOF);
            expect(source.peekChar()).toBe(EOF);
        });

        it('should handle multiline strings', () => {
            expect.assertions(5);

            const program: string = ['A', 'B'].join(EOL);
            const source = new Source(program);

            expect(source.currentChar()).toBe('A');
            expect(source.peekChar()).toBe(EOL);
            expect(source.nextChar()).toBe('B');
            expect(source.peekChar()).toBe(EOL);
            expect(source.nextChar()).toBe(EOF);
        });
    });

    describe('language scanner', () => {

        it('should scan a string', () => {
            expect.assertions(4);

            const program = 'A * B';
            const source = new Source(program);
            const scanner = new LanguageScanner(source);

            let token: Token;

            token = scanner.extractToken();
            expect(token.getTokenType()).toBe(TokenType.WordToken);
            token = scanner.extractToken();
            expect(token.getTokenType()).toBe(TokenType.SymbolToken);
            token = scanner.extractToken();
            expect(token.getTokenType()).toBe(TokenType.WordToken);
            token = scanner.extractToken();
            expect(token.getTokenType()).toBe(TokenType.EoFToken);
        });

        it('should scan identifiers', () => {
            expect.assertions(5);
            const program = 'let x = x';
            const source = new Source(program);
            const scanner = new LanguageScanner(source);

            let token: Token;

            token = scanner.extractToken();
            expect(token.getTokenType()).toBe(TokenType.IdentifierToken);
            token = scanner.extractToken();
            expect(token.getTokenType()).toBe(TokenType.WordToken);
            token = scanner.extractToken();
            expect(token.getTokenType()).toBe(TokenType.SymbolToken);
            token = scanner.extractToken();
            expect(token.getTokenType()).toBe(TokenType.WordToken);
            token = scanner.extractToken();
            expect(token.getTokenType()).toBe(TokenType.EoFToken);
        });

        it('should return error token with a syntax error', () => {
            expect.assertions(2);
            const program = '<';
            const source = new Source(program);
            const scanner = new LanguageScanner(source);

            expect(scanner.extractToken().getTokenType()).toBe(TokenType.ErrorToken);
            expect(scanner.extractToken().getTokenType()).toBe(TokenType.EoFToken);
        });
    });
});