import {
    RESET_SCALE,
    ZOOM_IN,
    ZOOM_OUT
} from './constants';

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
export type CanvasActions =
    | ResetScaleAction
    | ZoomInAction
    | ZoomOutAction;

/**
 * Canvas Container State.
 */
export interface CanvasState {
    download: {
        loading: boolean;
    };
    scale: number;
}