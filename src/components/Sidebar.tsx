import React from 'react';

import ExamplesList from './ExamplesList';

/**
 * The Menu Component.
 * 
 * @returns Menu Component.
 */
export default function Sidebar(): JSX.Element {
    return (
        <div>
            <p className="is-size-5">Code</p>
            <textarea className="textarea" placeholder="10 lines of textarea" rows={10}></textarea>
            <p className="is-size-5">Flags</p>
            <div style={{ backgroundColor: 'red' }} >Feature Flags</div>
            <p className="is-size-5">Examples</p>
            <ExamplesList />
        </div>
    );
}
