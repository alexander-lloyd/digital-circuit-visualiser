import {
    MODAL_HIDE,
    MODAL_SHOW,
    SET_FEATURE_FLAG,
    SET_SOURCE_REQUEST,
    SET_SOURCE_SUCCESS,
    SET_SOURCE_FAILURE,
    RESET_SCALE,
    ZOOM_IN,
    ZOOM_OUT
} from './constants';
import {
    DispatchFunction,
    ModalHideAction,
    ModalShowAction,
    SetFeatureFlagAction,
    SetSourceCodeRequestAction,
    SetSourceCodeSuccessAction,
    SetSourceCodeFailureAction,
    ResetScaleAction,
    ZoomInAction,
    ZoomOutAction
} from './types';
import {compile, SyntaxError, AST} from '../../lib/parser/index';
import {FEATURES_KEYS} from '../../assets/features';

/**
 * Create a ModalHideAction.
 *
 * @returns ModalHideAction.
 */
export function modalHideAction(): ModalHideAction {
    return {
        type: MODAL_HIDE
    };
}

/**
 * Create a ModalShowAction.
 *
 * @returns ModalShowAction.
 */
export function modalShowAction(): ModalShowAction {
    return {
        type: MODAL_SHOW
    };
}

/**
 * Set a feaure flag.
 *
 * @param name Feature Name.
 * @param value Set feature value.
 * @returns SetFeatureFlagAction.
 */
export function setFeatureFlag(name: FEATURES_KEYS, value: boolean): SetFeatureFlagAction {
    return {
        type: SET_FEATURE_FLAG,
        name,
        value
    };
}

/**
 * Set the source code. Fires off Actions.
 *
 * @param dispatch Dispatch Function.
 * @returns Action Creater with side effect.
 */
export function setSourceCode(dispatch: DispatchFunction): (source: string) => void {
    return (source: string): void => {
        dispatch({
            type: SET_SOURCE_REQUEST,
            source
        });
        // Compile.
        try {
            const ast = compile(source);
            dispatch({
                type: SET_SOURCE_SUCCESS,
                ast
            });
        } catch (e) {
            const reason = (e as SyntaxError).message;
            dispatch({
                type: SET_SOURCE_FAILURE,
                reason
            });
        }
    };
}

/**
 * Request to set the Source Code.
 *
 * @param source Source Code.
 * @returns Set Source Code Request Action.
 */
export function setSourceCodeRequest(source: string): SetSourceCodeRequestAction {
    return {
        type: SET_SOURCE_REQUEST,
        source
    };
}

/**
 * Request to set the AST in the state.
 *
 * @param ast AST.
 * @returns Set Source Code Success Action.
 */
export function setSourceCodeSuccess(ast: AST): SetSourceCodeSuccessAction {
    return {
        type: SET_SOURCE_SUCCESS,
        ast
    };
}

/**
 * Fired if parsing failed.
 *
 * @param reason Failure Reason.
 * @returns Set Source Code Request Action.
 */
export function setSourceCodeFailure(reason: string): SetSourceCodeFailureAction {
    return {
        type: SET_SOURCE_FAILURE,
        reason
    };
}

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
export interface ActionCreaters {
    setSourceCode: typeof setSourceCodeRequest;
    resetZoom: typeof resetZoom;
    zoomIn: typeof zoomIn;
    zoomOut: typeof zoomOut;
}
