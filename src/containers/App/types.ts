import {
    SET_SOURCE_REQUEST,
    SET_SOURCE_SUCCESS,
    SET_SOURCE_FAILURE,
    RESET_SCALE,
    ZOOM_IN,
    ZOOM_OUT
} from './constants';
import {AST} from 'lib/parser/ast';

export type DispatchFunction = (action: AppActions) => void;

/**
 * Set the source code of the canvas.
 */
export interface SetSourceCodeRequestAction {
    type: typeof SET_SOURCE_REQUEST;
    source: string;
}

/**
 * Code successfully compiled. Set the AST.
 */
export interface SetSourceCodeSuccessAction {
    type: typeof SET_SOURCE_SUCCESS;
    ast: AST;
}

/**
 * Set the source code of the canvas.
 */
export interface SetSourceCodeFailureAction {
    type: typeof SET_SOURCE_FAILURE;
    reason: string;
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
    | SetSourceCodeRequestAction
    | SetSourceCodeSuccessAction
    | SetSourceCodeFailureAction
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
    // On initial load we won't have an AST until success Action.
    ast: AST | null;
    // No error string on successful Action.
    errorString: string | null;
}
