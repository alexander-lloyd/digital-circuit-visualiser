/**
 * TypeScript does not have a char type.
 * Create an alias for clarity.
 */
type Char = string;

export const EOL: Char = '\n';
export const EOF: Char = '\0';

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
     * @param source The program source. 
     */
    public constructor(source: string) {
        this.source = source.split(EOL)
    }

    /**
     * Get the current char.
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
     * Get the next character in the source.
     * Increment the position in the string.
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

/**
 * Base class for all Tokens.
 */
class Token {
}

/**
 * Scanner.
 * 
 * Abstract scanner class will be implemented by language-specific classes.
 */
abstract class Scanner {
    /**
     * Constructor
     * @param source The program source. 
     */
    public constructor(private source: Source) {}

    /**
     * Extract a token from the Source.
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
