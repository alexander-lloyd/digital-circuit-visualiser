import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faCompressArrowsAlt,
    faDownload,
    faWindowRestore
} from '@fortawesome/free-solid-svg-icons';

/**
 * CanvasButtonGroup Properties
 */
interface CanvasButtonGroupProps {
    isDownloadLoading: boolean;
    onResetPerspective: () => void;
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
        isDownloadLoading,
        onDownload,
        onResetPerspective,
        onResetScale
    } = props;

    return (
        <div className="buttons box">
            <button className="button is-outlined is-primary"
                    onClick={onResetScale}
                    type="button">
                <span className="icon">
                    <FontAwesomeIcon icon={faCompressArrowsAlt} />
                </span>
                <span>Reset Scale</span>
            </button>
            <button className="button is-outlined is-primary"
                    onClick={onResetPerspective}
                    type="button">
                <span className="icon">
                    <FontAwesomeIcon icon={faWindowRestore} />
                </span>
                <span>Reset Perspective</span>
            </button>
            <button className={`button is-outlined is-primary ${isDownloadLoading ? 'is-loading' : ''}`}
                    data-testid="download-button"
                    onClick={onDownload}
                    type="button">
                <span className="icon">
                    <FontAwesomeIcon icon={faDownload} />
                </span>
                <span>Export to PNG</span>
            </button>
        </div>
    );
}
