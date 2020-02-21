import {combineReducers} from 'redux';

import {canvasReducer} from './containers/Canvas/reducer';
import {CanvasState} from './containers/Canvas/types';

/**
 * Global State Tree.
 */
export interface GlobalState {
    canvas: CanvasState;
}

/**
 * Combine reducer into a single reducer for the store.
 *
 * @returns Combined Reducer
 */
export default function createReducers() { // eslint-disable-line
    const rootReducer = combineReducers({
        canvas: canvasReducer
    });

    return rootReducer;
}
