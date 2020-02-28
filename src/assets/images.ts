/* eslint-disable max-len */
import AND_GATE from './images/AND-Gate.svg';
import OR_GATE from './images/OR-Gate.svg';
import JOIN_GATE from './images/JOIN-Gate.svg';
import SPLIT_GATE from './images/SPLIT-Gate.svg';

export type ImageMetaData = {
    name: string;
    image: string;
};

export type ImageMap = {
    [key: string]: ImageMetaData;
};

const images: ImageMap = {
    AND: {
        name: 'AND Gate',
        image: AND_GATE
    },
    OR: {
        name: 'OR Gate',
        image: OR_GATE
    },
    JOIN: {
        name: 'JOIN',
        image: JOIN_GATE
    },
    SPLIT: {
        name: 'SPLIT',
        image: SPLIT_GATE
    }
};

export {
    images
};
