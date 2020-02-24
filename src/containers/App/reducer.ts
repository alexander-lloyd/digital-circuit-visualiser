import {
    RESET_SCALE,
    SET_SOURCE_CODE,
    ZOOM_IN,
    ZOOM_OUT
} from './constants';
import {AppActions, GlobalState} from './types';
import {
    INITIAL_CODE,
    INITIAL_SCALE,
    MAXIMUM_SCALE,
    MINIMUM_SCALE,
    SCALING_FACTOR
} from '../Canvas/constants';


const initialState: GlobalState = {
    download: {
        loading: false
    },
    scale: INITIAL_SCALE,
    code: INITIAL_CODE
};

/**
 * Canvas Reducer.
 *
 * @param state Previous State.
 * @param action Canvas Action.
 * @returns New State.
 */
export function reducer(state = initialState, action: AppActions): GlobalState {
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
