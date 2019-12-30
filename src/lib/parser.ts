/**
 * TypeScript does not have a char type.
 * Create an alias for clarity.
 */
type Char = string;

export const EOL: Char = '\n';
export const EOF: Char = '\0';

/**
 * Is value an alphabetic character.
 * 
 * @param value The value.
 * @returns true if the character is an alphabetic character.
 */
export function isLetter(value: string): boolean {
    return value.match(/[a-z]/gi) != null;
}

/**
 * Is value a numeric character?
 * 
 * @param value The value.
 * @returns true if the character is a numeric character.
 */
export function isNumeric(value: string): boolean {
    return value.match(/[0-9]/g) != null;
}

/**
 * Is the character a whitespace character.
 *
 * @param value The value.
 * @returns true if the value is a whitespace character.
 */
export function isWhitespace(value: string): boolean {
    return value.match(/\s/g) != null;
}

/**
 * Source.
 *
 * Represents a source program.
 */
export class Source {
    private readonly source: string[];
    private lineNumber = -1;
    private linePosition = -2;
    private line: string | null = null;

    /**
     * Constructor.
     *
     * @param source The program source. 
     */
    public constructor(source: string) {
        this.source = source.split(EOL)
    }

    /**
     * Get the current char.
     *
     * @returns The current char.
     */
    public currentChar(): Char {
        if (this.linePosition == -2) {
            // First time?
            this.readLine();
            return this.nextChar();
        } else if (this.line == null) {
            // At end of file?
            return EOF;
        } else if ((this.linePosition == -1) || (this.linePosition == this.line.length)) {
            // At end of line?
            this.readLine();
            return this.nextChar();
        } else {
            return this.line.charAt(this.linePosition);
        }
    }

    /**
     * Peek at the next character in the source.
     *
     * @returns The next character.
     */
    public peekChar(): Char {
        this.currentChar();

        const nextPos = this.linePosition + 1;

        if (this.line == null) {
            return EOF;
        }

        return nextPos < this.line.length
          ? this.line.charAt(nextPos)
          : EOL;
    }

    /**
     * Get the next character in the source.Increment the position in the string.
     *
     * @returns The next character.
     */
    public nextChar(): Char {
        this.linePosition++;
        return this.currentChar();
    }

    /**
     * Read next line in source.
     */
    private readLine(): void {
        this.lineNumber++;
        this.line = this.source[this.lineNumber];
        this.linePosition = -1;
    }
}

export enum TokenType {
    EoFToken = 'EoFToken',
    SymbolToken = 'SymbolToken',
    WordToken = 'WordToken',
    IdentifierToken = 'IdentifierToken',
    ErrorToken = 'ErrorToken'
}

/**
 * Base class for all Tokens.
 */
export class Token {
    private readonly tokenType: TokenType;

    public constructor(tokenType: TokenType) {
        this.tokenType = tokenType;
    }

    public getTokenType(): TokenType {
        return this.tokenType;
    }
}

class EoFToken extends Token {
    public constructor() {
        super(TokenType.EoFToken);
    }
}

class WordToken extends Token {
    private readonly literal: string;

    public constructor(literal: string) {
        super(TokenType.WordToken)
        this.literal = literal;
    }
}

class SymbolToken extends Token {
    private readonly symbol: string;

    public constructor(symbol: string) {
        super(TokenType.SymbolToken);
        this.symbol = symbol;
    }
}

class IdentifierToken extends Token {
    private readonly identifier: string;

    public constructor(identifier: string) {
        super(TokenType.IdentifierToken);
        this.identifier = identifier;
    }
}

class ErrorToken extends Token {
    public constructor() {
        super(TokenType.ErrorToken);
    }
}

/**
 * Scanner.
 * 
 * Abstract scanner class will be implemented by language-specific classes.
 */
abstract class Scanner {
    protected source: Source;

    /**
     * Constructor
     *
     * @param source The program source. 
     */
    public constructor(source: Source) {
        this.source = source;
    }

    /**
     * Extract a token from the Source.
     *
     * @returns The next token.
     */
    public abstract extractToken(): Token;
}

/**
 * Parser.
 * 
 * Abstract parser class will be implemented by language-specific classes.
 */
abstract class Parser {
    public constructor(private scanner: Scanner) {}

    /**
     * Parse the program.
     */
    public abstract parse(): void;
}

const SYMBOLS = new Map<string, string>()
  .set('=', 'EQUALS')
  .set('*', 'COMPOSE');

const RESERVED_WORDS = ['let'];

export class LanguageScanner extends Scanner {
    public constructor(source: Source) {
        super(source);
    }

    public extractToken(): Token {
        let token: Token;
        this.skipWhitespace();

        const currentChar: Char = this.source.currentChar();

        if (currentChar == EOF) {
            token = new EoFToken();
        } else if (isLetter(currentChar)) {
            token = this.extractWord();
        } else if (SYMBOLS.has(currentChar)) {
            token = new SymbolToken(currentChar);
        } else {
            token = new ErrorToken();
        }
        this.source.nextChar();

        return token;
    }

    /**
     * Move the source object pointer until the next token.
     */
    private skipWhitespace(): void {
        let currentChar = this.source.currentChar();

        while (isWhitespace(currentChar) && (currentChar != EOF)) {
            currentChar = this.source.nextChar();
        }
    }

    /**
     * Extract a word out of the source.
     * 
     * @returns A token.
     */
    private extractWord(): Token {
        let currentChar = this.source.currentChar();
        let word = '';

        while (isLetter(currentChar) || isNumeric(currentChar)) {
            word += currentChar;
            currentChar = this.source.nextChar();
        }

        if (RESERVED_WORDS.includes(word)) {
            return new IdentifierToken(word);
        } else {
            // Not a reserved word so it's just a word.
            return new WordToken(word);
        }
    }
}