import React from 'react';

/**
 * Modal Properties.
 */
interface ModalProps {
    closeAction: () => void;
    children: JSX.Element;
    show: boolean;
    title: string;
}

/**
 * Modal Component.
 *
 * @param props Modal Properties.
 * @returns Modal Component.
 */
export default function Modal({closeAction, children, show, title}: ModalProps): JSX.Element {
    return (
        <div className={`modal ${show ? 'is-active' : ''}`}>
            <div className="modal-background"
                 onClick={closeAction} />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    <button aria-label="close"
                            className="delete"
                            onClick={closeAction}
                            type="button" />
                </header>
                <section className="modal-card-body">
                    {children}
                </section>
                <footer className="modal-card-foot">
                    <button className="button"
                            onClick={closeAction}
                            type="button">
                        Okay
                    </button>
                </footer>
            </div>
        </div>
    );
}
