import {
    RESET_SCALE,
    ZOOM_IN,
    ZOOM_OUT
} from './constants';
import {
    ResetScaleAction,
    ZoomInAction,
    ZoomOutAction
} from './types';

/**
 * Reset Zoom Action Creater.
 *
 * @returns Reset Scale Action.
 */
export function resetZoom(): ResetScaleAction {
    return {
        type: RESET_SCALE
    };
}

/**
 * Zoom In Action Creater.
 *
 * @returns Zoom In Action.
 */
export function zoomIn(): ZoomInAction {
    return {
        type: ZOOM_IN
    };
}

/**
 * Zoom Out Action Creater.
 *
 * @returns Zoom Out Action.
 */
export function zoomOut(): ZoomOutAction {
    return {
        type: ZOOM_OUT
    };
}

/**
 * Canvas Action Creaters.
 */
export interface CanvasActionCreaters {
    resetZoom: typeof resetZoom;
    zoomIn: typeof zoomIn;
    zoomOut: typeof zoomOut;
}
