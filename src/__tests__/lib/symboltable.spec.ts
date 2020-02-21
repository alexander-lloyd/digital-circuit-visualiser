import {createSymbolTableStack, SymbolTableEntryImpl, SymbolTableImpl} from '../../lib/symboltable';

describe('symbol table', () => {
    it('should create a symbol table entry', () => {
        expect.assertions(1);

        const name = 'table entry';
        const entry = new SymbolTableEntryImpl(name);

        expect(entry.getName()).toBe(name);
    });

    it('should create a table', () => {
        expect.assertions(2);

        const name = 'table entry';

        const table = new SymbolTableImpl(0);

        const entry = table.enter(name);
        expect(entry).not.toBeNull();

        const entry2 = table.lookup(name);

        expect(entry).toBe(entry2);
    });

    it('should return null if looking up', () => {
        expect.assertions(1);

        const name = 'non existent';

        const table = new SymbolTableImpl(0);

        const entry = table.lookup(name);
        expect(entry).toBeNull();
    });

    it('should create a symbol table stack', () => {
        expect.assertions(2);

        const name = 'variable name';
        const stack = createSymbolTableStack();

        const entry = stack.enter(name);
        expect(stack.lookup(name)).toBe(entry);
        expect(stack.getSymbolTable().lookup(name)).toBe(entry);
    });
});
