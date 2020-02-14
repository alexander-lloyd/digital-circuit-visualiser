import * as React from 'react';

import Canvas from '../containers/Canvas/index';
import Header from './Header';
import Sidebar from './Sidebar';

import './App.scss';

/**
 * App Component.
 *
 * @returns App
 */
export default function App (): JSX.Element  {
    return (
        <div className="fullscreen">
            <Header />
            <div className="columns fullheight is-gapless">
                <div className="column fullheight is-narrow">
                    <Sidebar />
                </div>
                <div className="column">
                    <Canvas />
                </div>
            </div>
        </div>
    );
}
