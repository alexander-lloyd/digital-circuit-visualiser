export type ExampleMetaData = {
    name: string;
    descrition: string;
    source: string;
};

type Examples = {
    [id: string]: ExampleMetaData;
};

export const EXAMPLES: Examples = {
    AND: {
        name: 'AND Gate',
        descrition: 'Example with an AND Gate',
        source: 'let x = AND in x;'
    },
    OR: {
        name: 'OR Gate',
        descrition: 'Example with an OR Gate',
        source: 'let x = OR in x;'
    }
};
