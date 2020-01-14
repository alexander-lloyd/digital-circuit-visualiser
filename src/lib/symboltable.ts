/**
 * SymbolTableEntry.
 */
export interface SymbolTableEntry {
    /**
     * Get the table entry name.
     *
     * @returns The entry name.
     */
    getName(): string;
}

/**
 * SymbolTable.
 */
export interface SymbolTable {
    /**
     * Insert a new value into the table.
     *
     * @param name The new name in the table.
     * @returns The new table entry.
     */
    enter(name: string): SymbolTableEntry;

    /**
     * Lookup an entry in the table.
     *
     * @param name The name to lookup.
     * @returns The entry if it exists or else null.
     */
    lookup(name: string): SymbolTableEntry | null;
}

/**
 * SymbolTableStack.
 */
export interface SymbolTableStack {
    /**
     * Insert a new value into the table.
     *
     * @param name The new name in the table.
     * @returns The new table entry.
     */
    enter(name: string): SymbolTableEntry;

    /**
     * Lookup an entry in the table.
     *
     * @param name The name to lookup.
     * @returns The entry if it exists or else null.
     */
    lookup(name: string): SymbolTableEntry | null;

    /**
     * Get the symbol table.
     *
     * @returns The symbol table.
     */
    getSymbolTable(): SymbolTable;
}

/**
 * SymbolTableEntryImpl.
 */
export class SymbolTableEntryImpl implements SymbolTableEntry {
    private readonly name: string;

    /**
     * Constructor.
     *
     * @param name The entry name.
     */
    public constructor(name: string) {
        this.name = name;
    }

    /**
     * Get the table entry name.
     *
     * @returns The entry name.
     */
    public getName(): string {
        return this.name;
    }

}

/**
 * SymbolTableImpl.
 */
export class SymbolTableImpl implements SymbolTable {
    private readonly symbolTable: Map<string, SymbolTableEntry> = new Map();
    private scopeLevel: number;

    /**
     * Constructor.
     *
     * @param scopeLevel The level scope.
     */
    public constructor(scopeLevel: number) {
        this.scopeLevel = scopeLevel;
    }

    /**
     * Insert a new value into the table.
     *
     * @param name The new name in the table.
     * @returns The new table entry.
     */
    public enter(name: string): SymbolTableEntry {
        const entry = this.createSymbolTableEntry(name);
        this.symbolTable.set(name, entry);

        return entry;
    }

    /**
     * Lookup an entry in the table.
     *
     * @param name The name to lookup.
     * @returns The entry if it exists or else null.
     */
    public lookup(name: string): SymbolTableEntry | null {
        const entry = this.symbolTable.get(name);

        return entry ? entry : null;
    }

    /**
     * Create a SymbolTableEntry.
     *
     * @param name The entry name.
     * @returns A new symbol table entry.
     */
    private createSymbolTableEntry(name: string): SymbolTableEntry {
        return new SymbolTableEntryImpl(name);
    }
}

/**
 * SymbolTableStackImpl.
 */
export class SymbolTableStackImpl implements SymbolTableStack {
    private readonly stack: Array<SymbolTable> = [];
    private currentScope: number;

    /**
     * Constructor.
     */
    public constructor() {
        this.currentScope = 0;
        this.stack.push(this.createSymbolTable(this.currentScope));
    }

    /**
     * Insert a new value into the table.
     *
     * @param name The new name in the table.
     * @returns The new table entry.
     */
    public enter(name: string): SymbolTableEntry {
        return this.getSymbolTable().enter(name);
    }

    /**
     * Lookup an entry in the table.
     *
     * @param name The name to lookup.
     * @returns The entry if it exists or else null.
     */
    public lookup(name: string): SymbolTableEntry | null {
        return this.getSymbolTable().lookup(name);
    }

    /**
     * Get the symbol table.
     *
     * @returns The symbol table.
     */
    public getSymbolTable(): SymbolTable {
        return this.stack[this.currentScope];
    }

    /**
     * Create a SymbolTable.
     *
     * @param scopeLevel The scope level.
     * @returns A new symbol table.
     */
    private createSymbolTable(scopeLevel: number): SymbolTable {
        return new SymbolTableImpl(scopeLevel);
    }
}

/**
 * Create a new SymbolTableStack.
 *
 * @returns A new symbol table stack.
 */
export function createSymbolTableStack(): SymbolTableStack {
    return new SymbolTableStackImpl();
}
