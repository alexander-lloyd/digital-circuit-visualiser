import {Template, template} from './template';
import {SymbolTableStack} from './symboltable';

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
    return value.match(/[a-z]/giu) !== null;
}

/**
 * Is value a numeric character?
 *
 * @param value The value.
 * @returns true if the character is a numeric character.
 */
export function isNumeric(value: string): boolean {
    return value.match(/[0-9]/gu) !== null;
}

/**
 * Is the character a whitespace character.
 *
 * @param value The value.
 * @returns true if the value is a whitespace character.
 */
export function isWhitespace(value: string): boolean {
    return value.match(/\s/gu) !== null;
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
        this.source = source.split(EOL);
    }

    /**
     * Get the current char.
     *
     * @returns The current char.
     */
    public currentChar(): Char {
        if (this.linePosition === -2) {
            // First time?
            this.readLine();
            return this.nextChar();
        } else if (this.line === null || this.line === undefined) {
            // At end of file?
            return EOF;
        } else if (this.linePosition === -1 || this.linePosition === this.line.length) {
            // At end of line?
            this.readLine();
            return this.nextChar();
        }
        return this.line.charAt(this.linePosition);
    }

    /**
     * Peek at the next character in the source.
     *
     * @returns The next character.
     */
    public peekChar(): Char {
        this.currentChar();

        const nextPos = this.linePosition + 1;

        if (this.line === null) {
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

    /**
     * Constructor.
     *
     * @param tokenType The type of token this object is.
     */
    public constructor(tokenType: TokenType) {
        this.tokenType = tokenType;
    }

    /**
     * Get the token type.
     *
     * @returns The token type.
     */
    public getTokenType(): TokenType {
        return this.tokenType;
    }
}

/**
 * An end of file token.
 */
class EoFToken extends Token {
    /**
     * Constructor.
     */
    public constructor() {
        super(TokenType.EoFToken);
    }
}

/**
 * A word token.
 *
 * Represents a literal. E.g. A variable.
 */
class WordToken extends Token {
    private readonly literal: string;

    /**
     * Constructor.
     *
     * @param literal A literal.
     */
    public constructor(literal: string) {
        super(TokenType.WordToken);
        this.literal = literal;
    }

    /**
     * Get the literal.
     *
     * @returns The literal.
     */
    public getLiteral(): string {
        return this.literal;
    }
}

/**
 * A Symbol token.
 *
 * E.g. '+'
 */
class SymbolToken extends Token {
    private readonly symbol: string;

    /**
     * Constructor.
     *
     * @param symbol The symbol.
     */
    public constructor(symbol: string) {
        super(TokenType.SymbolToken);
        this.symbol = symbol;
    }

    /**
     * Get the symbol.
     *
     * @returns The symbol.
     */
    public getSymbol(): string {
        return this.symbol;
    }
}

/**
 * An Identifier.
 *
 * E.g. 'in'
 */
class IdentifierToken extends Token {
    private readonly identifier: string;

    /**
     * Constructor.
     *
     * @param identifier An identifier.
     */
    public constructor(identifier: string) {
        super(TokenType.IdentifierToken);
        this.identifier = identifier;
    }
}

/**
 * Token used when we get an unexpected character.
 */
class ErrorToken extends Token {
    /**
     * Constructor.
     */
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

enum ErrorType {
    SYNTAX_ERROR = 'Syntax Error',
    UNEXPECTED_SYMBOL = 'Unexpected Symbol'
}

/**
 * ErrorHandler.
 *
 * Flag warning and errors to the user.
 */
interface ErrorHandler {
    /**
     * Flag an error or warning.
     *
     * @param token The token where the warning should be raised.
     * @param errorType The type of warning or error.
     */
    flag(token: Token, errorType: ErrorType): void;
}

/**
 * Log Warning and Errors to the user using the console.
 */
class ConsoleErrorHandler implements ErrorHandler {
    private template: Template = template`ERROR: ${'errorType'}`;

    /**
     * Flag an error or warning.
     *
     * @param token The token where the warning should be raised.
     * @param errorType The type of warning or error.
     */
    public flag(token: Token, errorType: ErrorType): void {
        console.error(this.template({errorType}));
    }
}

/**
 * Parser.
 *
 * Abstract parser class will be implemented by language-specific classes.
 */
abstract class Parser<T> {
    protected readonly scanner: Scanner;
    protected readonly errorHandler: ErrorHandler;
    protected readonly symbolStack: SymbolTableStack;

    /**
     * Constructor.
     *
     * @param scanner Scanner object.
     * @param errorHandler ErrorHandler object.
     * @param symbolStack Symbol Table Stack.
     */
    public constructor(
        scanner: Scanner,
        errorHandler: ErrorHandler,
        symbolStack: SymbolTableStack
    ) {
        this.scanner = scanner;
        this.errorHandler = errorHandler;
        this.symbolStack = symbolStack;
    }

    /**
     * Parse the program.
     */
    public abstract parse(): T;
}

enum LanguageTokenEnum {
    COMPOSE = '*',
    EQUAL = '=',
}

type LanguageTokenType = TokenType | LanguageTokenEnum;

const SYMBOLS = new Map<string, LanguageTokenEnum>().
    set('=', LanguageTokenEnum.EQUAL).
    set('*', LanguageTokenEnum.COMPOSE);

const RESERVED_WORDS = ['let'];

/**
 * The scanner for this language.
 */
export class LanguageScanner extends Scanner {
    /**
     * Extract a token based on the current character.
     *
     * @returns The next token.
     */
    public extractToken(): Token {
        let token: Token;
        this.skipWhitespace();

        const currentChar: Char = this.source.currentChar();

        if (currentChar === EOF) {
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

        while (isWhitespace(currentChar) && currentChar !== EOF) {
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
        }
        // Not a reserved word so it's just a word.
        return new WordToken(word);
    }
}

/**
 * ASTNodeType.
 */
enum ASTNodeType {
    COMPOSE,
    VARIABLE
}

/**
 * Attributes an AST Node can store.
 */
enum ASTAttribute {
    VARIABLE_NAME,
    VALUE
}

/**
 * AST Node.
 */
interface AST {
    /**
     * Get the type of AST Node.
     *
     * @returns The AST Node type.
     */
    getType(): ASTNodeType;

    /**
     * Add a child to the AST Node.
     *
     * @param node: AST Node.
     */
    addChild(node: AST): void;

    /**
     * Get a attribute from the node.
     *
     * @param key Attribute key.
     * @returns the attribute value.
     */
    getAttribute(key: ASTAttribute): string | undefined;

    /**
     * Set an attribute on the node.
     *
     * @param key The attribute.
     * @param value The attribute value.
     */
    setAttribute(key: ASTAttribute, value: string): void;
}

/**
 * AST Implementation.
 */
class ASTImpl implements AST {
    private readonly nodeType: ASTNodeType;
    private readonly children: AST[] = [];
    private readonly attributes: Map<ASTAttribute, string> = new Map();

    /**
     * Constructor.
     *
     * @param nodeType The AST Node Type.
     */
    public constructor(nodeType: ASTNodeType) {
        this.nodeType = nodeType;
    }

    /**
     * Get the type of AST Node.
     *
     * @returns The AST Node type.
     */
    public getType(): ASTNodeType {
        return this.nodeType;
    }

    /**
     * Add a child to the AST Node.
     *
     * @param node AST Node.
     */
    public addChild(node: AST): void {
        this.children.push(node);
    }

    /**
     * Get a attribute from the node.
     *
     * @param key Attribute key.
     * @returns the attribute value.
     */
    public getAttribute(key: ASTAttribute): string | undefined {
        return this.attributes.get(key);
    }

    /**
     * Set an attribute on the node.
     *
     * @param key The attribute.
     * @param value The attribute value.
     */
    public setAttribute(key: ASTAttribute, value: string): void {
        this.attributes.set(key, value);
    }
}

/**
 * Create an AST Node.
 *
 * @param nodeType AST Node Type.
 * @returns New AST Node.
 */
function createASTNode(nodeType: ASTNodeType): AST {
    return new ASTImpl(nodeType);
}

/**
 * ExpressionParser.
 */
class ExpressionParser extends Parser<AST> {
    private static readonly OPS_MAP: Map<LanguageTokenType, ASTNodeType> = new Map().
        set(LanguageTokenEnum.COMPOSE, ASTNodeType.COMPOSE);

    /**
     * Parse an expression.
     *
     * @returns Expression AST.
     */
    public parse(): AST {
        let token: Token = this.scanner.extractToken();
        let tokenType: TokenType = token.getTokenType();

        if (tokenType !== TokenType.WordToken) {
            this.errorHandler.flag(token, ErrorType.SYNTAX_ERROR);
        }

        // Create root AST
        let rootAST = createASTNode(ASTNodeType.VARIABLE);

        token = this.scanner.extractToken();
        tokenType = token.getTokenType();

        while (tokenType === TokenType.SymbolToken) {
            const symbolToken = token as SymbolToken;
            const symbol = symbolToken.getSymbol();
            const symbolType = SYMBOLS.get(symbol);
            if (symbolType === undefined) {
                this.errorHandler.flag(token, ErrorType.UNEXPECTED_SYMBOL);
                continue;
            }
            const astNodeType = ExpressionParser.OPS_MAP.get(symbolType);
            if (astNodeType === undefined) {
                this.errorHandler.flag(token, ErrorType.UNEXPECTED_SYMBOL);
                continue;
            }
            const ast = createASTNode(astNodeType);
            ast.addChild(rootAST);
            rootAST = ast;
        }

        return rootAST;
    }
}

/**
 * LanguageParser.
 */
export class LanguageParser extends Parser<AST> {
    private readonly expressionParser: ExpressionParser;

    /**
     * Constructor.
     *
     * @param scanner Scanner object.
     * @param errorHandler Error Handler. Called when an error is raised
     * @param symbolStack Symbol Table Stack.
     */
    constructor(scanner: Scanner, errorHandler: ErrorHandler, symbolStack: SymbolTableStack) {
        super(scanner, errorHandler, symbolStack);
        this.expressionParser = new ExpressionParser(scanner, errorHandler, symbolStack);
    }

    /**
     * Parse the program.
     *
     * @returns Expression AST.
     */
    public parse(): AST {
        const ast = this.expressionParser.parse();
        const token = this.scanner.extractToken();

        if (token.getTokenType() !== TokenType.EoFToken) {
            // Error the string isn't finished.
            this.errorHandler.flag(token, ErrorType.SYNTAX_ERROR);
        }

        return ast;
    }
}
