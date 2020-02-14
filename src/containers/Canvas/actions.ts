import {
    RESET_SCALE,
    ZOOM_IN,
    ZOOM_OUT
} from './constants';

/**
 * Reset Scale Action.
 */
interface ResetScaleAction {
    type: typeof RESET_SCALE;
}

/**
 * Zoom In Action.
 */
interface ZoomInAction {
    type: typeof ZOOM_IN;
}

/**
 * Zoom Out Action.
 */
interface ZoomOutAction {
    type: typeof ZOOM_OUT;
}

export type CanvasActions =
    | ResetScaleAction
    | ZoomInAction
    | ZoomOutAction;
