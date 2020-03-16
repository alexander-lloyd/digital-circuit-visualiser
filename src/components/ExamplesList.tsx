/* eslint no-magic-numbers: ["warn", {"ignore": [1]}] */
import React, {ChangeEvent} from 'react';
import {connect} from 'react-redux';

import {Examples} from '../assets/examples';
import * as actions from '../containers/App/actions';
import {DispatchFunction} from '../containers/App/types';

/**
 * Dispatch Props.
 */
interface DispatchProps {
    setSourceCode: (source: string) => void;
}

/**
 * Component Props.
 */
interface ComponentProps {
    examples: Examples;
}

/**
 * Examples List Component.
 *
 * @returns Example List Component.
 */
export function ExamplesList({setSourceCode, examples}: DispatchProps & ComponentProps): JSX.Element {
    const exampleList = Object.entries(examples);

    /**
     * Handle when an element is selected in the Examples List.
     *
     * @param event ChangeEvent.
     */
    function onExampleSelected(event: ChangeEvent): void {
        const {value} = event.target as HTMLSelectElement;
        const metadata = examples[value];
        const {source} = metadata;
        setSourceCode(source);
    }

    return (
        <div className="field has-addons">
            <div className="control is-expanded">
                <div className="select is-fullwidth">
                    <select data-testid="examples"
                            defaultValue="DEFAULT"
                            name="examples"
                            onChange={onExampleSelected}>
                        <option disabled
                                value="DEFAULT">
                            Select an Example
                        </option>
                        {
                        exampleList.map(([key, example]) => (
                            <option key={key}
                                    value={key}>
                                { example.name }
                            </option>
                        ))
                        }
                    </select>
                </div>
            </div>
        </div>
    );
}

/**
 * Map State To Props.
 *
 * @returns Empty State.
 */
export function mapStateToProps(): {} {
    return {};
}

/**
 * Map Dispatch to Props.
 *
 * @param dispatch Action dispatcher.
 * @returns Props.
 */
export function mapDispatchToProps(dispatch: DispatchFunction): DispatchProps {
    return {
        setSourceCode: actions.setSourceCode(dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExamplesList);
