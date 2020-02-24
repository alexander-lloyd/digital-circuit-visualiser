import * as React from 'react';

import Canvas from '../Canvas/index';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

import './App.scss';

/**
 * App Component.
 *
 * @returns App
 */
export default function App (): JSX.Element {
    return (
        <div className="fullscreen">
            <Header />
            <div className="columns is-fullheight-with-navbar is-gapless"
                 style={{height: 'calc(100% - 1rem)'}}>
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
