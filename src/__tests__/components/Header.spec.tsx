import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import {Header, mapStateToProps, mapDispatchToProps} from '../../components/Header';


describe('header component', () => {
    it('should render the component', () => {
        expect.assertions(1);

        const openModalMock = jest.fn();
        const component = <Header showModal={openModalMock} />;
        const renderResult = render(component);

        expect(renderResult).not.toBeNull();
    });


    it('should call showModal action if button is pressed', () => {
        expect.assertions(1);

        const openModalMock = jest.fn();
        const component = <Header showModal={openModalMock} />;
        const {getByTestId} = render(component);
        fireEvent.click(getByTestId('header-open-modal'));

        expect(openModalMock).toHaveBeenCalledTimes(1);
    });

    it('should map state to props', () => {
        expect.assertions(1);
        expect(mapStateToProps()).not.toBeNull();
    });

    it('should map dispatch to props', () => {
        expect.assertions(1);
        const dispatchMock = jest.fn();

        const {showModal} = mapDispatchToProps(dispatchMock);
        showModal();
        expect(dispatchMock).toHaveBeenCalledTimes(1);
    });
});
