import React from 'react';

import {EXAMPLES} from '../assets/examples';

/**
 * Examples List Component.
 *
 * @returns Example List Component.
 */
export default function ExamplesList(): JSX.Element {
    return (
        <div className="field has-addons">
            <div className="control is-expanded">
                <div className="select is-fullwidth">
                    <select name="country">
                        {
                        Object.entries(EXAMPLES).map(([key, example]) => (
                            <option key={key}
                                    value={key}>
                                { example.name }
                            </option>
                        ))
                        }
                    </select>
                </div>
            </div>
            <div className="control">
                <button className="button is-primary"
                        type="submit">
                    Choose
                </button>
            </div>
        </div>
    );
}
