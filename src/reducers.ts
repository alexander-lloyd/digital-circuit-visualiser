import { combineReducers } from 'redux';

import { canvasReducer } from './containers/Canvas/reducer';
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