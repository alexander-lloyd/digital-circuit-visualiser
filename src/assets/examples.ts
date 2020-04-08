export type ExampleMetaData = {
    name: string;
    description: string;
    source: string;
};

export type Examples = {
    [id: string]: ExampleMetaData;
};

export const EXAMPLES: Examples = {
    JOIN_GATES: {
        name: 'Join Two Gates',
        description: 'Join two outputs.',
        source: 'let x = AND * AND in x . JOIN'
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
        description: 'Set Reset Latch build using NAND gates',
        source: 'let latch = ((ID * SPLIT) * (SPLIT * ID)) . (NAND * CROSS * NAND) . (JOIN * JOIN)\n in latch'
    },
    SR_NOR_LATCH: {
        name: 'SR NOR Latch',
        description: 'Set Reset Latch built using NAND gates',
        source: 'let latch = ((ID * SPLIT) * (SPLIT * ID)) . (NOR * CROSS* NOR) . (JOIN * JOIN)\n in latch'
    },
    SR_AND_OR_LATCH: {
        name: 'SR AND-OR Latch',
        description: 'Set Reset Latch built using AND and OR gates',
        source: 'let latch = (STUB * ID * ID) . (feedback ((OR * NOT) . AND) . ID) in latch'
    },
    D_LATCH: {
        name: 'D Latch',
        description: 'D latch. AN extension of the SR latch removing the possibility of invalid input states',
        source: `(((SPLIT * ID) . (ID * CROSS)).
(ID * SPLIT * ID). (NOT * ID * STUB * STUB* ID * ID )) .
(AND * SPLIT * SPLIT * AND) . (NOR* CROSS * NOR) . (JOIN * JOIN)`
    },
    '2_1_MULTIPLEXER': {
        name: '2:1 Multiplexer',
        description: '',
        source: '((ID * SPLIT * ID) . (ID * NOT * AND)) . (AND * SPLIT). (OR * ID)'
    }
};
