import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import createReducers from './reducers';

export default function configureStore(initialState = {}) {
    const reducers = createReducers();
    const store = createStore(
        reducers,
        composeWithDevTools()
    );

    return store;
}