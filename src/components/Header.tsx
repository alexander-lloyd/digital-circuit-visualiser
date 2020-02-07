import React from 'react';

/**
 * Header Component.
 *
 * @returns Header Component.
 */
export default function Header(): JSX.Element {
    return (
        <div className="navbar is-link">
            <div className="navbar-brand">
                <a className="navbar-item"
                   href="https://bulma.io">
                    <h1 className="title has-text-white">Hypernet Visualisation</h1>
                </a>
            </div>
        </div>
    );
}