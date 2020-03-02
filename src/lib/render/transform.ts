import {LineEntry} from './types';

/**
 * Scale a line entry
 *
 * @param line Line Entry.
 * @param scaleX scale X.
 * @param scaleY scale Y.
 * @returns New Line Entry.
 */
export function scaleLineEntry([[x1, y1], [x2, y2]]: LineEntry, scaleX: number, scaleY: number): LineEntry {
    const newX1 = x1 * scaleX;
    const newY1 = y1 * scaleY;
    const newX2 = x2 * scaleX;
    const newY2 = y2 * scaleY;
    return [[newX1, newY1], [newX2, newY2]];
}

/**
 * Translate a line entry
 *
 * @param line Line Entry.
 * @param translateX translate X.
 * @param translateY translate Y.
 * @returns New Line Entry.
 */
export function translateLineEntry([[x1, y1], [x2, y2]]: LineEntry, translateX: number, translateY: number): LineEntry {
    const x1b = x1 + translateX;
    const y1b = y1 + translateY;
    const x2b = x2 + translateX;
    const y2b = y2 + translateY;
    return [[x1b, y1b], [x2b, y2b]];
}