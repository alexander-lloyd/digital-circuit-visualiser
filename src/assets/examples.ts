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
        description: 'Example with an AND Gate',
        source: 'AND'
    },
    OR: {
        name: 'OR Gate',
        description: 'Example with an OR Gate',
        source: 'OR'
    }
};
