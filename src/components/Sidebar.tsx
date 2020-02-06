import React from 'react';

import ExamplesList from './ExamplesList';
import FeatureFlags from './FeatureFlags';

import './Sidebar.scss';

const exampleCode = `let x = f ⊗ g;`;

/**
 * The Menu Component.
 * 
 * @returns Menu Component.
 */
export default function Sidebar(): JSX.Element {
    return (
        <div className="sidebar is-fullheight">
            <p className="is-size-5">Code</p>
            <textarea className="textarea" rows={10} defaultValue={ exampleCode }></textarea>
            <p className="is-size-5">Flags</p>
            <FeatureFlags />
            <p className="is-size-5">Examples</p>
            <ExamplesList />
        </div>
    );
}
