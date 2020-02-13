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
        <aside className="menu sidebar is-mobile is-fullheight box has-background-white-ter">
            <p className="menu-label is-size-5">Code</p>
            <textarea className="textarea"
                      placeholder={exampleCode}
                      rows={10} />
            <p className="menu-label is-size-5">Flags</p>
            <FeatureFlags />
            <p className="menu-label is-size-5">Examples</p>
            <ExamplesList />
        </aside>
    );
}
