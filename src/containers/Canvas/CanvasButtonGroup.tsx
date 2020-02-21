import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCompressArrowsAlt, faDownload} from '@fortawesome/free-solid-svg-icons';

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
                <span className="icon">
                    <FontAwesomeIcon icon={faCompressArrowsAlt} />
                </span>
                <span>Reset Scale</span>
            </button>
            <button className={`button is-outlined is-primary ${isDownloadLoading ? 'is-loading' : ''}`}
                    onClick={(): void => props.onDownload()}
                    type="button">
                <span className="icon">
                    <FontAwesomeIcon icon={faDownload} />
                </span>
                <span>Export to PNG</span>
            </button>
        </div>
    );
}
