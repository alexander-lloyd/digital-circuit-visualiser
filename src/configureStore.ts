import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import {reducer} from './containers/App/reducer';

/**
 * Create the store.
 *
 * @returns The Application Store.
 */
export default function configureStore() { // eslint-disable-line
    const store = createStore(
        reducer,
        composeWithDevTools()
    );

    return store;
}
