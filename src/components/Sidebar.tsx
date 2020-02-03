import React from 'react';

import ExamplesList from './ExamplesList';

const exampleCode = `let x = f ⊗ g;`;

/**
 * The Menu Component.
 * 
 * @returns Menu Component.
 */
export default function Sidebar(): JSX.Element {
    return (
        <div>
            <p className="is-size-5">Code</p>
            <textarea className="textarea" rows={10}>{ exampleCode }</textarea>
            <p className="is-size-5">Flags</p>
            <div style={{ backgroundColor: 'red' }} >Feature Flags</div>
            <p className="is-size-5">Examples</p>
            <ExamplesList />
        </div>
    );
}
