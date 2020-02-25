import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {config} from '@fortawesome/fontawesome-svg-core';

import configureStore from './configureStore';
import App from './containers/App/index';

import './index.scss';

// Make sure this is before any other `fontawesome` API calls
config.autoAddCss = false;

const store = configureStore();
const rootElement: HTMLElement | null = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);
