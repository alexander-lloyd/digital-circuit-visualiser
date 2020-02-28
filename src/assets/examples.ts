export type ExampleMetaData = {
    name: string;
    description: string;
    source: string;
};

type Examples = {
    [id: string]: ExampleMetaData;
};

export const EXAMPLES: Examples = {
    AND: {
        name: 'AND Gate',
        descrition: 'Example with an AND Gate',
        source: 'AND'
    },
    OR: {
        name: 'OR Gate',
        descrition: 'Example with an OR Gate',
        source: 'OR'
    }
};
