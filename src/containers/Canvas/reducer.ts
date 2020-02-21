import {RESET_SCALE, SCALING_FACTOR, ZOOM_IN, ZOOM_OUT} from './constants';
import {CanvasActions, CanvasState} from './types';

const initialScale = 1.0;

const initialCanvasState: CanvasState = {
    download: {
        loading: false
    },
    scale: initialScale
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
    case RESET_SCALE: {
        return {
            ...state,
            scale: initialScale
        };
    }
    case ZOOM_IN: {
        const newScale = Math.min(oldScale * SCALING_FACTOR, 5);
        return {
            ...state,
            scale: newScale
        };
    }
    case ZOOM_OUT: {
        const newScale = Math.max(oldScale / SCALING_FACTOR, 0.5);
        return {
            ...state,
            scale: newScale
        };
    }
    default:
        return state;
    }
}
