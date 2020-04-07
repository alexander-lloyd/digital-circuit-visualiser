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
        source: 'let adder = (SPLIT * SPLIT) . (ID * CROSS * ID) . (XOR * AND) in adder'
    },
    FULL_ADDER: {
        name: 'Full Adder',
        description: 'Full Adder',
        source: `let adder = (SPLIT * SPLIT) . (ID * CROSS * ID) . (XOR * AND) in
  let fulladder = (ID * adder) . (adder * ID) . (ID * OR)
    in fulladder`
    },
    TWO_BIT_ADDER: {
        name: '2 Bit Adder',
        description: 'Add two bit integers together',
        source: `let adder = (SPLIT * SPLIT) . (ID * CROSS * ID) . (XOR * AND) in
  let fulladder = (ID * adder) . (adder * ID) . (ID * OR)
    in (adder* ID * ID) . (ID * fulladder)`
    },
    SR_NAND_LATCH: {
        name: 'SR NAND Latch',
        description: 'Set Reset Latch build using NAND Gates',
        source: 'let latch = ((ID * SPLIT) * (SPLIT * ID)) . (NAND * CROSS * NAND) . (JOIN * JOIN)\n in latch'
    },
    SR_NOR_LATCH: {
        name: 'SR NOR Latch',
        description: 'Set Reset Latch build using NAND Gates',
        source: 'let latch = ((ID * SPLIT) * (SPLIT * ID)) . (NOR * CROSS* NOR) . (JOIN * JOIN)\n in latch'
    }
};
