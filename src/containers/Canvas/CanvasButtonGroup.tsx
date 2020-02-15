import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons';

/**
 * CanvasButtonGroup Properties 
 */
interface CanvasButtonGroupProps {
    isDownloadLoading: boolean;
    onResetScale: () => void;
    onDownload: () => void;
}

/**
 * CanvasButtonGroup Component.
 * 
 * @param props CanvasButtonGroup Properties.
 * @returns CanvasButtonGroup Component.
 */
export default function CanvasButtonGroup(props: CanvasButtonGroupProps): JSX.Element {
    const {
        isDownloadLoading
    } = props;

    return (
        <div className="buttons box">
            <button className="button is-outlined is-primary"
                    onClick={(): void => props.onResetScale()}
                    type="button">
                Reset Scale
            </button>
            <button className={"button is-outlined is-primary " + (isDownloadLoading ? "is-loading": "")}
                    onClick={(): void => props.onDownload()}
                    type="button">
                <span className="icon">
                    <FontAwesomeIcon icon={faDownload} />
                </span>
                <span>Export to SVG</span>
            </button>
        </div>
    );
}