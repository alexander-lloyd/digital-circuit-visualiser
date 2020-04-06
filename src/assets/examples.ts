export type ExampleMetaData = {
    name: string;
    description: string;
    source: string;
};

export type Examples = {
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
    },
    JOIN_GATES: {
        name: 'Join Two Gates',
        description: 'Join two outputs.',
        source: 'let x = AND * AND in x . JOIN'
    },
    SPLIT_GATES: {
        name: 'Split Output',
        description: 'Split output into two outputs.',
        source: 'let x = AND * AND in OR. SPLIT . x'
    },
    FOUR_INPUT_AND: {
        name: 'Four Input AND',
        description: 'Four Input AND',
        source: '(AND * AND) . AND'
    },
    COMPLEX_EXAMPLE: {
        name: 'Complex Example',
        description: 'Complex Example',
        source: '(AND * ((AND * AND . NOT) . JOIN)) . JOIN'
    },
    HALF_ADDER: {
        name: 'Half Adder',
        description: 'Half Adder',
        source: 'let adder = (SPLIT * SPLIT) . (ID * CROSS * ID) . (AND * XOR) in adder'
    },
    FULL_ADDER: {
        name: 'Full Adder',
        description: 'Full Adder',
        source: 'let adder = (SPLIT * SPLIT) . (ID * CROSS * ID) . (AND * XOR) in\n  (ID . adder) . (adder * ID) . (ID * OR)'
    }
};
