/* eslint-disable max-len, no-magic-numbers */

import AND_GATE from './images/AND-Gate.svg';
import OR_GATE from './images/OR-Gate.svg';
import JOIN_GATE from './images/JOIN-Gate.svg';
import SPLIT_GATE from './images/SPLIT-Gate.svg';
import NOT_GATE from './images/NOT-Gate.svg';
import NOR_GATE from './images/NOR-Gate.svg';
import NAND_GATE from './images/NAND-Gate.svg';
import XOR_GATE from './images/XOR-Gate.svg';
import XNOR_GATE from './images/XNOR-Gate.svg';
import ID from './images/ID.svg';
import CROSS from './images/CROSS.svg';

type Point = [number, number];

export type ImageMetaData = {
    name: string;
    description: string;
    image: string;
    inputs: Point[];
    outputs: Point[];
    width: number;
    height: number;
};

export type ImageMap = {
    [key: string]: ImageMetaData;
};

const images: ImageMap = {
    AND: {
        name: 'AND Gate',
        description: '2 Input AND Gate. Both Inputs must be true for the output to be true',
        image: AND_GATE,
        inputs: [[25, 22.5], [25, 52.5]],
        outputs: [[174, 37.5]],
        width: 200,
        height: 75
    },
    OR: {
        name: 'OR Gate',
        description: '2 Input OR Gate. Either input must be true for the output to be true',
        image: OR_GATE,
        inputs: [[25, 22.5], [25, 52.5]],
        outputs: [[175, 37.5]],
        width: 200,
        height: 75
    },
    JOIN: {
        name: 'JOIN',
        description: 'Join the output of two gates. A JOIN can be used to join the output of two functions into a single output.',
        image: JOIN_GATE,
        inputs: [[11.5, 22.5], [11.5, 77.5]],
        outputs: [[86, 49.5]],
        width: 100,
        height: 100
    },
    SPLIT: {
        name: 'SPLIT',
        description: 'Split the output of two gates. Split a single output into two outputs.',
        image: SPLIT_GATE,
        inputs: [[14, 50.5]],
        outputs: [[88.5, 22.5], [88.5, 77.5]],
        width: 100,
        height: 100
    },
    NOT: {
        name: 'NOT',
        description: 'Invert the input',
        image: NOT_GATE,
        inputs: [[0, 95]],
        outputs: [[320, 95]],
        width: 533.33,
        height: 192
    },
    NOR: {
        name: 'NOR',
        description: '2 Input NOR Gate.',
        image: NOR_GATE,
        inputs: [[70, 51], [70, 130]],
        outputs: [[350, 90]],
        width: 533.33,
        height: 192
    },
    NAND: {
        name: 'NAND',
        description: '2 Input NAND Gate. The opposite to AND. Outputs true if either of the inputs is not true.',
        image: NAND_GATE,
        inputs: [[70, 51], [70, 130]],
        outputs: [[350, 90]],
        width: 533.33,
        height: 192
    },
    XOR: {
        name: 'XOR',
        description: '2 Input XOR Gate. Outputs true if only 1 of the inputs is true. Outputs false if none or all of the inputs are true',
        image: XOR_GATE,
        inputs: [[10, 15], [10, 35]],
        outputs: [[100, 25]],
        width: 100,
        height: 50
    },
    XNOR: {
        name: 'XNOR',
        description: '2 Input XNOR Gate. Outputs true if either all of none of the outputs are true.',
        image: XNOR_GATE,
        inputs: [[10, 15], [10, 35]],
        outputs: [[100, 25]],
        width: 100,
        height: 50
    },
    ID: {
        name: 'ID',
        description: 'A straight wire.',
        image: ID,
        inputs: [[0, 50]],
        outputs: [[100, 50]],
        width: 100,
        height: 100
    },
    CROSS: {
        name: 'CROSS',
        description: 'A wire crossing.',
        image: CROSS,
        inputs: [[0, 0], [0, 100]],
        outputs: [[100, 0], [100, 100]],
        width: 100,
        height: 100
    }
};

export {
    images
};
