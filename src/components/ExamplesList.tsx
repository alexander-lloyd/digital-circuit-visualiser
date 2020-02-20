import React from 'react';

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
                        <option value="AND Gate">AND Gate</option>
                        <option value="OR Gate">OR Gate</option>
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
