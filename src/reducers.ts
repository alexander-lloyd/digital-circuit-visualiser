import { combineReducers } from 'redux';

const initialState = {};

/**
 * Combine reducer into a single reducer for the store.
 *
 * @returns Combined Reducer
 */
export default function createReducers() {
    const rootReducer = combineReducers({
        test: (state: any = initialState, action: any) => state
    });

    return rootReducer;
}