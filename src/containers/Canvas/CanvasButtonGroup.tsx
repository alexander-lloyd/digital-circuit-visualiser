import React from 'react';

/**
 * CanvasButtonGroup Properties 
 */
interface CanvasButtonGroupProps {
    onResetScale: () => void;
}

/**
 * CanvasButtonGroup Component.
 * 
 * @param props CanvasButtonGroup Properties.
 * @returns CanvasButtonGroup Component.
 */
export default function CanvasButtonGroup(props: CanvasButtonGroupProps): JSX.Element {
    return (
        <div className="buttons box">
            <button className="button is-outlined is-link"
                    onClick={(): void => props.onResetScale()}
                    type="button">
                Reset Scale
            </button>
        </div>
    );
}