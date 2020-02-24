import {
    SET_SOURCE_CODE,
    RESET_SCALE,
    ZOOM_IN,
    ZOOM_OUT
} from './constants';

/**
 * Set the source code of the canvas.
 */
export interface SetSourceCodeAction {
    type: typeof SET_SOURCE_CODE;
    code: string;
}

/**
 * Reset Scale Action.
 */
export interface ResetScaleAction {
    type: typeof RESET_SCALE;
}

/**
 * Zoom In Action.
 */
export interface ZoomInAction {
    type: typeof ZOOM_IN;
}

/**
 * Zoom Out Action.
 */
export interface ZoomOutAction {
    type: typeof ZOOM_OUT;
}

/**
 * Canvas Actions.
 */
export type AppActions =
    | SetSourceCodeAction
    | ResetScaleAction
    | ZoomInAction
    | ZoomOutAction;

/**
 * Canvas Container State.
 */
export interface GlobalState {
    download: {
        loading: boolean;
    };
    scale: number;
    code: string;
}
