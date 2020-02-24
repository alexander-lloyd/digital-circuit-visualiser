import {combineReducers} from 'redux';

import {canvasReducer} from '../Canvas/reducer';
import {CanvasState} from '../Canvas/types';

/**
 * Global State Tree.
 */
export interface GlobalState {
    canvas: CanvasState;
}

export default function createReducers() { // eslint-disable-line
    const rootReducer = combineReducers({
        canvas: canvasReducer
    });

    return rootReducer;
}
