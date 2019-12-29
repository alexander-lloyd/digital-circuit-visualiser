/**
 * TypeScript does not have a char type.
 * Create an alias for clarity.
 */
type Char = string;

/**
 * Source.
 *
 * Represents a source program.
 */
class Source {

    /**
     * Constructor.
     * @param source The program source. 
     */
    public constructor(private source: string) {}

    /**
     * Get the current char.
     * @returns The current char.
     */
    public currentChar(): Char {
        return '';
    }

    /**
     * Peek at the next character in the source.
     * @returns The next character.
     */
    public peekChar(): Char {
        return '';
    }

    /**
     * Get the next character in the source.
     * Increment the position in the string.
     * @returns The next character.
     */
    public nextChar(): Char {
        return '';
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