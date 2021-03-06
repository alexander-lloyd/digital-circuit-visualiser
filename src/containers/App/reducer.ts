/* eslint complexity: ["error", 12] */
import {
    INITIAL_CODE,
    MODAL_HIDE,
    MODAL_SHOW,
    RESET_SCALE,
    SET_FEATURE_FLAG,
    SET_SOURCE_REQUEST,
    SET_SOURCE_SUCCESS,
    SET_SOURCE_FAILURE,
    ZOOM_IN,
    ZOOM_OUT
} from './constants';
import {AppActions, GlobalState} from './types';
import {
    INITIAL_SCALE,
    MAXIMUM_SCALE,
    MINIMUM_SCALE,
    SCALING_FACTOR
} from '../Canvas/constants';


export const initialState: GlobalState = {
    download: {
        loading: false
    },
    scale: INITIAL_SCALE,
    code: INITIAL_CODE,
    ast: null,
    errorString: null,
    showModal: false,
    featureFlags: {}
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
    case MODAL_HIDE: {
        return {
            ...state,
            showModal: false
        };
    }
    case MODAL_SHOW: {
        return {
            ...state,
            showModal: true
        };
    }
    case SET_FEATURE_FLAG: {
        const {name, value} = action;
        return {
            ...state,
            featureFlags: {
                ...state.featureFlags,
                [name]: value
            }
        };
    }
    case SET_SOURCE_REQUEST: {
        const {source} = action;
        if (source === state.code) {
            return state;
        }
        return {
            ...state,
            code: source
        };
    }
    case SET_SOURCE_SUCCESS: {
        const {ast} = action;
        return {
            ...state,
            ast,
            // We don't have an error.
            errorString: null
        };
    }
    case SET_SOURCE_FAILURE: {
        const {reason} = action;
        return {
            ...state,
            // Set the AST to null?
            ast: null,
            errorString: reason
        };
    }
    case RESET_SCALE: {
        return {
            ...state,
            scale: INITIAL_SCALE
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
