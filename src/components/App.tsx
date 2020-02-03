import * as React from 'react';

import Canvas from './Canvas';
import Header from './Header';
import Sidebar from './Sidebar';

/**
 * App Component.
 *
 * @returns App
 */
export const App = (): JSX.Element => (
    <div>
        <Header />
        <div className="columns is-gapless">
            <div className="column is-one-quarter">
                <Sidebar />
            </div>
            <div className="column">
                <Canvas />
            </div>
        </div>
    </div>
);
