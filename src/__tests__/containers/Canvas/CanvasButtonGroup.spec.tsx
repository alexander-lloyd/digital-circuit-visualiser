import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import CanvasButtonGroup from '../../../containers/Canvas/CanvasButtonGroup';

describe('canvas button group component', () => {
    it('component to render', () => {
        expect.assertions(1);

        const downloadMock = jest.fn();
        const resetPerspectiveMock = jest.fn();
        const resetScaleMock = jest.fn();

        const component = (<CanvasButtonGroup isDownloadLoading={false}
                                              onDownload={downloadMock}
                                              onResetPerspective={resetPerspectiveMock}
                                              onResetScale={resetScaleMock} />);
        const renderResult = render(component);
        expect(renderResult).not.toBeNull();
    });

    it('download button should show loading', () => {
        expect.assertions(1);

        const downloadMock = jest.fn();
        const resetPerspectiveMock = jest.fn();
        const resetScaleMock = jest.fn();

        const component = (<CanvasButtonGroup isDownloadLoading
                                              onDownload={downloadMock}
                                              onResetPerspective={resetPerspectiveMock}
                                              onResetScale={resetScaleMock} />);
        const {getByTestId} = render(component);
        const element = getByTestId('download-button');
        expect(element.classList).toContain('is-loading');
    });

    it('should issue download when download button is pressed', () => {
        expect.assertions(1);

        const downloadMock = jest.fn();
        const resetPerspectiveMock = jest.fn();
        const resetScaleMock = jest.fn();

        const component = (<CanvasButtonGroup isDownloadLoading={false}
                                              onDownload={downloadMock}
                                              onResetPerspective={resetPerspectiveMock}
                                              onResetScale={resetScaleMock} />);
        const {getByText} = render(component);
        const element = getByText('Export to PNG');
        fireEvent.click(element);
        expect(downloadMock).toHaveBeenCalledTimes(1);
    });

    it('should reset scale when reset scale button is pressed', () => {
        expect.assertions(1);

        const downloadMock = jest.fn();
        const resetPerspectiveMock = jest.fn();
        const resetScaleMock = jest.fn();

        const component = (<CanvasButtonGroup isDownloadLoading={false}
                                              onDownload={downloadMock}
                                              onResetPerspective={resetPerspectiveMock}
                                              onResetScale={resetScaleMock} />);
        const {getByText} = render(component);
        const element = getByText('Reset Scale');
        fireEvent.click(element);
        expect(resetScaleMock).toHaveBeenCalledTimes(1);
    });

    it('should reset perspective when reset perspective button is pressed', () => {
        expect.assertions(1);

        const downloadMock = jest.fn();
        const resetPerspectiveMock = jest.fn();
        const resetScaleMock = jest.fn();

        const component = (<CanvasButtonGroup isDownloadLoading={false}
                                              onDownload={downloadMock}
                                              onResetPerspective={resetPerspectiveMock}
                                              onResetScale={resetScaleMock} />);
        const {getByText} = render(component);
        const element = getByText('Reset Perspective');
        fireEvent.click(element);
        expect(resetPerspectiveMock).toHaveBeenCalledTimes(1);
    });
});
