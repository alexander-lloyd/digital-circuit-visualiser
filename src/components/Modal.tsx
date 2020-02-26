import React from 'react';

/**
 * Modal Properties.
 */
interface ModalProps {
    content: string;
    title: string;
}

/**
 * Modal Component.
 *
 * @param props Modal Properties.
 * @returns Modal Component.
 */
export default function Modal({content, title}: ModalProps): JSX.Element {
    return (
        <div className="modal">
            <div className="modal-background" />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    <button aria-label="close"
                            className="delete"
                            type="button" />
                </header>
                <section className="modal-card-body">
                    {content}
                </section>
                <footer className="modal-card-foot">
                    <button className="button"
                            type="button">
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    );
}
