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

type Point = [number, number];

export type ImageMetaData = {
    name: string;
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
        image: AND_GATE,
        inputs: [[25, 22.5], [25, 52.5]],
        outputs: [[174, 37.5]],
        width: 200,
        height: 75
    },
    OR: {
        name: 'OR Gate',
        image: OR_GATE,
        inputs: [[25, 22.5], [25, 52.5]],
        outputs: [[175, 37.5]],
        width: 200,
        height: 75
    },
    JOIN: {
        name: 'JOIN',
        image: JOIN_GATE,
        inputs: [[11.5, 22.5], [11.5, 77.5]],
        outputs: [[86, 49.5]],
        width: 100,
        height: 100
    },
    SPLIT: {
        name: 'SPLIT',
        image: SPLIT_GATE,
        inputs: [[14, 50.5]],
        outputs: [[88.5, 22.5], [88.5, 77.5]],
        width: 100,
        height: 100
    },
    NOT: {
        name: 'NOT',
        image: NOT_GATE,
        inputs: [[0, 95]],
        outputs: [[320, 95]],
        width: 533.33,
        height: 192
    },
    NOR: {
        name: 'NOR',
        image: NOR_GATE,
        inputs: [[70, 51], [70, 130]],
        outputs: [[350, 90]],
        width: 533.33,
        height: 192
    },
    NAND: {
        name: 'NAND',
        image: NAND_GATE,
        inputs: [[70, 51], [70, 130]],
        outputs: [[350, 90]],
        width: 533.33,
        height: 192
    },
    XOR: {
        name: 'XOR',
        image: XOR_GATE,
        inputs: [[10, 15], [10, 35]],
        outputs: [[100, 25]],
        width: 100,
        height: 50
    },
    XNOR: {
        name: 'XNOR',
        image: XNOR_GATE,
        inputs: [[10, 15], [10, 35]],
        outputs: [[100, 25]],
        width: 100,
        height: 50
    }
};

export {
    images
};
