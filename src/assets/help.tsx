import React from 'react';

import {images} from './images';

export const HELP_TITLE = 'Help';

/**
 * Help Component.
 *
 * @returns Help Component.
 */
export function HelpContentComponent(): JSX.Element {
    return (
        <div className="content">
            <h2>Navigating the Canvas</h2>
            <h2>Language</h2>
            <p>
                The code input field allows you to define your
                graph. A simple example would be:
            </p>
            <pre><code>AND</code></pre>
            <p>
                An AND Gate should appear. The currently supported list
                of fates are:
            </p>
            <ul>
                {
                    Object.entries(images).sort(([name], [name2]) => name.localeCompare(name2)).
                        map(([name, metadata]) => (
                            <li key={name}>
                                {`${name}: ${metadata.description}`}
                            </li>
                        ))
                }
            </ul>
            <p>
                Functions can be joined together using the tensor and
                compose methods. An example of a tensor is:
            </p>
            <pre><code>AND * OR</code></pre>
            <p>
                An example of a compose is:
            </p>
            <pre><code>AND . OR</code></pre>
            <p>
                An example of a join:
            </p>
            <pre><code>(AND * OR) . JOIN</code></pre>
            <p>
                An example of a split:
            </p>
            <pre><code>AND . SPLIT</code></pre>
            <p>
                You can also use let statements (similar to OCaml).
            </p>
            <pre><code>let variable = AND in expression</code></pre>
            <p>
                These can also be nested:
            </p>
            <pre>
                <code>
                    let x = AND in let y = OR in x * y
                </code>
            </pre>
            <h2>Flags</h2>
            <p>
                Flags are available to customise your render.
                Currently, only the
                {' '}
                <b>Render Unit Square</b>
                {' '}
                flag is available. This flag draws boxes around
                elements in the visualisation for debugging.
            </p>
            <h2>Examples</h2>
            <p>
                Examples can be found under the Examples Section.
                To select an example, click the dropdown and select
                an example.
            </p>
        </div>
    );
}
