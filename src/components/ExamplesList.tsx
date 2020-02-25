import React, {useRef} from 'react';
import {connect} from 'react-redux';

import {EXAMPLES} from '../assets/examples';
import * as actions from '../containers/App/actions';
import {DispatchFunction} from '../containers/App/types';

/**
 * Dispatch Props.
 */
interface DispatchProps {
    setSourceCode: (source: string) => void;
}

/**
 * Examples List Component.
 *
 * @returns Example List Component.
 */
function ExamplesList({setSourceCode}: DispatchProps): JSX.Element {
    const selectRef = useRef<HTMLSelectElement>(null);
    const exampleList = Object.entries(EXAMPLES);

    /**
     * Handle when an element is selected in the Examples List.
     */
    function onExampleSelected(): void {
        const element = selectRef.current;
        if (!element) {
            return;
        }

        const index = element.selectedIndex - 1;
        const [, metadata] = exampleList[index];
        const {source} = metadata;
        setSourceCode(source);
    }

    return (
        <div className="field has-addons">
            <div className="control is-expanded">
                <div className="select is-fullwidth">
                    <select name="examples"
                            onChange={onExampleSelected}
                            ref={selectRef}>
                        <option disabled
                                selected
                                value="">
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
function mapStateToProps(): {} {
    return {};
}

/**
 * Map Dispatch to Props.
 *
 * @param dispatch Action dispatcher.
 * @returns Props.
 */
function mapDispatchToProps(dispatch: DispatchFunction): DispatchProps {
    return {
        setSourceCode: actions.setSourceCode(dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExamplesList);
