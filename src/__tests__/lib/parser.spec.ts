import { Source, EOF, EOL, isLetter, isNumeric, LanguageScanner, Token, TokenType, isWhitespace } from '../../lib/parser';

const stringSource = 'A + B';

test.each([
    ['A', true],
    ['B', true],
    ['c', true],
    ['/', false],
    [':', false],
    ['', false]
])('should isLetter(%c)? %b', (char, isChar) => {
    expect(isLetter(char)).toBe(isChar);
});

test.each([
    ['1', true],
    ['2', true],
    ['9', true],
    ['a', false],
    ['Z', false],
    ['', false]
])('should isNumeric(%c)? %b', (char, isChar) => {
    expect(isNumeric(char)).toBe(isChar);
});

test.each([
    [' ', true],
    ['\t', true],
    ['\n', true],
    ['a', false],
    ['4', false],
    ['', false]
])('should isWhitespace(%c)? %b', (char, isChar) => {
    expect(isWhitespace(char)).toBe(isChar);
});

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

describe('LanguageScanner', () => {

    it('should scan a string', () => {
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
        const program = '<';
        const source = new Source(program);
        const scanner = new LanguageScanner(source);

        expect(scanner.extractToken().getTokenType()).toBe(TokenType.ErrorToken);
        expect(scanner.extractToken().getTokenType()).toBe(TokenType.EoFToken);
    });
});