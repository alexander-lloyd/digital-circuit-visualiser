import React, {ChangeEvent} from 'react';
import {connect} from 'react-redux';

import ExamplesList from './ExamplesList';
import FeatureFlags from './FeatureFlags';

import './Sidebar.scss';
import * as actions from '../containers/App/actions';
import {GlobalState, DispatchFunction} from '../containers/App/types';

import {EXAMPLES} from '../assets/examples';
import {FEATURES} from '../assets/features';

const exampleCode = 'let x = AND tensor OR;';

/**
 * State Properties used in Component.
 */
interface StateProps {
    errorReason: string | null;
    source: string;
}

/**
 * Dispatch Properties used in Component.
 */
interface DispatchProps {
    setSourceCode: (source: string) => void;
}

/**
 * Compoenent Props.
 */
interface ComponentProps extends DispatchProps, StateProps {}

/**
 * The Menu Component.
 *
 * @param props Component Properties.
 * @returns Menu Component.
 */
export function Sidebar(props: ComponentProps): JSX.Element {
    const {
        errorReason,
        setSourceCode,
        source
    } = props;

    /**
     * Handle TextArea key press.
     *
     * @param event Handle a change to the Code Input.
     */
    const onKeyPressed = (event: ChangeEvent): void => {
        const sourceCode = (event.target as HTMLTextAreaElement).value;

        setSourceCode(sourceCode);
    };

    return (
        <aside className="menu sidebar is-mobile is-fullheight box has-background-white-ter">
            <p className="menu-label is-size-5">Code</p>
            <textarea className="textarea"
                      data-testid="source-area"
                      onChange={onKeyPressed}
                      placeholder={exampleCode}
                      rows={10}
                      value={source} />
            <div className="notification is-danger is-marginless"
                 hidden={errorReason === null || source === ''}>
                { errorReason }
            </div>
            <p className="menu-label is-size-5">Flags</p>
            <FeatureFlags features={FEATURES} />
            <p className="menu-label is-size-5">Examples</p>
            <ExamplesList examples={EXAMPLES} />
        </aside>
    );
}

/**
 * Map state to props.
 *
 * @param state Global State.
 * @returns Component Props.
 */
export function mapStateToProps(state: GlobalState): StateProps {
    const {errorString, code} = state;
    return {
        errorReason: errorString,
        source: code
    };
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
)(Sidebar);
