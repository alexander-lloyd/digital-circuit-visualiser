import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Modal from '../../components/Modal';


describe('modal component', () => {
    it('should render the component', () => {
        expect.hasAssertions();

        const closeActionMock = jest.fn();

        const component = (<Modal closeAction={closeActionMock}
                                  show
                                  title="Modal Title Text">
            <p data-testid="modal-child">Child</p>
        </Modal>);

        const renderResult = render(component);
        const {getByTestId, getByText} = renderResult;

        expect(renderResult).not.toBeNull();
        expect(getByTestId('modal-child')).toBeInTheDocument();
        expect(getByText('Modal Title Text')).toBeInTheDocument();
        expect(getByTestId('modal').classList.length).toBe(2);
    });


    it('should not show component if show is false', () => {
        expect.hasAssertions();

        const closeActionMock = jest.fn();

        const component = (<Modal closeAction={closeActionMock}
                                  show={false}
                                  title="Modal Title Text">
            <p data-testid="modal-child">Child</p>
        </Modal>);

        const renderResult = render(component);
        const {getByTestId} = renderResult;

        expect(renderResult).not.toBeNull();
        expect(getByTestId('modal').classList.length).toBe(1);
    });

    it('should close the modal if close button is pressed', () => {
        expect.hasAssertions();

        const closeActionMock = jest.fn();

        const component = (<Modal closeAction={closeActionMock}
                                  show
                                  title="Modal Title Text">
            <p data-testid="modal-child">Child</p>
        </Modal>);

        const renderResult = render(component);
        const {getByTestId} = renderResult;

        expect(renderResult).not.toBeNull();

        // Press close.
        fireEvent.click(getByTestId('modal-close'));

        expect(closeActionMock).toHaveBeenCalledTimes(1);
    });

    it('should close the modal if background is pressed', () => {
        expect.hasAssertions();

        const closeActionMock = jest.fn();

        const component = (<Modal closeAction={closeActionMock}
                                  show
                                  title="Modal Title Text">
            <p data-testid="modal-child">Child</p>
        </Modal>);

        const renderResult = render(component);
        const {getByTestId} = renderResult;

        expect(renderResult).not.toBeNull();

        // Press close.
        fireEvent.click(getByTestId('modal-background'));

        expect(closeActionMock).toHaveBeenCalledTimes(1);
    });

    it('should close the modal if close button is pressed 2', () => {
        expect.hasAssertions();

        const closeActionMock = jest.fn();

        const component = (<Modal closeAction={closeActionMock}
                                  show
                                  title="Modal Title Text">
            <p data-testid="modal-child">Child</p>
        </Modal>);

        const renderResult = render(component);
        const {getByTestId} = renderResult;

        expect(renderResult).not.toBeNull();

        // Press close.
        fireEvent.click(getByTestId('modal-footer-close'));

        expect(closeActionMock).toHaveBeenCalledTimes(1);
    });
});
