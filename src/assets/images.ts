/* eslint-disable max-len, no-magic-numbers */

import AND_GATE from './images/AND-Gate.svg';
import OR_GATE from './images/OR-Gate.svg';
import JOIN_GATE from './images/JOIN-Gate.svg';
import SPLIT_GATE from './images/SPLIT-Gate.svg';

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
        inputs: [[25, 52.5], [25, 22.5]],
        outputs: [[174, 37.5]],
        width: 200,
        height: 75
    },
    OR: {
        name: 'OR Gate',
        image: OR_GATE,
        inputs: [[25, 52.5], [25, 22.5]],
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
        inputs: [[88.5, 22.5], [88.5, 77.5]],
        outputs: [[14, 50.5]],
        width: 100,
        height: 100
    }
};

export {
    images
};
