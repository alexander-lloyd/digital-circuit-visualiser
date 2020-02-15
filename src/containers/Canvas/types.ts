import {
    REQUEST_DOWNLOAD,
    RESET_SCALE,
    ZOOM_IN,
    ZOOM_OUT
} from './constants';

/**
 * Request Download Action.
 */
export interface RequestDownloadAction {
    type: typeof REQUEST_DOWNLOAD;
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
export type CanvasActions =
    | RequestDownloadAction
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