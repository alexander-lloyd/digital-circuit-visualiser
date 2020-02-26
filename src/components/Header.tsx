import React from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

import * as actions from '../containers/App/actions';
import {DispatchFunction} from '../containers/App/types';

/**
 * HeaderProps.
 */
interface HeaderProps {
    showModal: () => void;
}

/**
 * Header Component.
 *
 * @param props Header Properties.
 * @returns Header Component.
 */
function Header({showModal}: HeaderProps): JSX.Element {
    return (
        <div className="navbar is-link is-fixed-top">
            <div className="navbar-brand">
                <a className="navbar-item"
                   href="#">
                    <h1 className="title has-text-white">Hypernet Visualisation</h1>
                </a>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <a className="button is-success"
                           onClick={showModal}>
                            <span className="icon is-small">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Map state to props.
 *
 * @returns Component Props.
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
function mapDispatchToProps(dispatch: DispatchFunction): HeaderProps {
    const {modalShowAction} = actions;
    return {
        showModal: (): void => dispatch(modalShowAction())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
