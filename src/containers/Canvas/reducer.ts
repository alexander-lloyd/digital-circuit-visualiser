import {
    INITIAL_CODE,
    MAXIMUM_SCALE,
    MINIMUM_SCALE,
    RESET_SCALE,
    SCALING_FACTOR,
    SET_SOURCE_CODE,
    ZOOM_IN,
    ZOOM_OUT
} from './constants';
import {CanvasActions, CanvasState} from './types';

const initialScale = 1.0;

const initialCanvasState: CanvasState = {
    download: {
        loading: false
    },
    scale: initialScale,
    code: INITIAL_CODE
};

/**
 * Canvas Reducer.
 *
 * @param state Previous State.
 * @param action Canvas Action.
 * @returns New State.
 */
export function canvasReducer(state = initialCanvasState, action: CanvasActions): CanvasState {
    const {scale: oldScale} = state;

    switch (action.type) {
    case SET_SOURCE_CODE: {
        const {code} = action;
        return {
            ...state,
            code
        };
    }
    case RESET_SCALE: {
        return {
            ...state,
            scale: initialScale
        };
    }
    case ZOOM_IN: {
        const newScale = Math.min(oldScale * SCALING_FACTOR, MAXIMUM_SCALE);
        return {
            ...state,
            scale: newScale
        };
    }
    case ZOOM_OUT: {
        const newScale = Math.max(oldScale / SCALING_FACTOR, MINIMUM_SCALE);
        return {
            ...state,
            scale: newScale
        };
    }
    default:
        return state;
    }
}
