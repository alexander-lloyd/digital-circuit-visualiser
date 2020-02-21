import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import createReducers from './reducers';

/**
 * Create the store.
 *
 * @returns The Application Store.
 */
export default function configureStore() { // eslint-disable-line
    const reducers = createReducers();
    const store = createStore(
        reducers,
        composeWithDevTools()
    );

    return store;
}
