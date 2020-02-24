import React, {KeyboardEvent, useRef} from 'react';
import {connect} from 'react-redux';

import ExamplesList from './ExamplesList';
import FeatureFlags from './FeatureFlags';

import './Sidebar.scss';
import * as actions from '../containers/App/actions';
import {GlobalState, DispatchFunction} from '../containers/App/types';

const exampleCode = 'let x = AND tensor OR;';

/**
 * State Properties used in Component.
 */
interface StateProps {
    errorReason: string | null;
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
function Sidebar(props: ComponentProps): JSX.Element {
    const {setSourceCode, errorReason} = props;

    const textInputRef = useRef<HTMLTextAreaElement>(null);

    const onKeyPressed = () => {
        const textarea = textInputRef.current;

        if (textarea === null) {
            return;
        }

        const source = textarea.value;

        setSourceCode(source);
    };

    return (
        <aside className="menu sidebar is-mobile is-fullheight box has-background-white-ter">
            <p className="menu-label is-size-5">Code</p>
            <textarea className="textarea"
                      onKeyUp={onKeyPressed}
                      placeholder={exampleCode}
                      ref={textInputRef}
                      rows={10} />
            <div className="notification is-danger"
                 hidden={errorReason === null}>
                { errorReason }
            </div>
            <p className="menu-label is-size-5">Flags</p>
            <FeatureFlags />
            <p className="menu-label is-size-5">Examples</p>
            <ExamplesList />
        </aside>
    );
}

/**
 * Map state to props.
 *
 * @param state Global State.
 * @returns Component Props.
 */
function mapStateToProps(state: GlobalState): StateProps {
    const {errorString} = state;
    return {
        errorReason: errorString
    };
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
)(Sidebar);
