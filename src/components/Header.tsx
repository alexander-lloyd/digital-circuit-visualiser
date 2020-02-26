import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

/**
 * Header Component.
 *
 * @returns Header Component.
 */
export default function Header(): JSX.Element {
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
                        <a className="button is-success">
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
