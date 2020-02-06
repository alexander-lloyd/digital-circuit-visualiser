import * as React from 'react';

import Canvas from './Canvas';
import Header from './Header';
import Sidebar from './Sidebar';

import './App.scss';

/**
 * App Component.
 *
 * @returns App
 */
export const App = (): JSX.Element => (
    <div className="fullscreen">
        <Header />
        <div className="columns fullheight">
            <div className="column is-4 fullheight">
                <Sidebar />
            </div>
            <div className="column">
                <Canvas />
            </div>
        </div>
    </div>
);
