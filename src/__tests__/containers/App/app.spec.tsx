import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import {App, mapStateToProps, mapDispatchToProps} from '../../../containers/App/App';
import {GlobalState} from '../../../containers/App/types';

jest.mock('../../../components/Header', (): {} => ({
    __esModule: true,
    default: jest.fn().mockReturnValue(<p />)
}));

jest.mock('../../../components/Sidebar', (): {} => ({
    __esModule: true,
    default: jest.fn().mockReturnValue(<p />)
}));

jest.mock('../../../containers/Canvas', (): {} => ({
    __esModule: true,
    default: jest.fn().mockReturnValue(<p />)
}));

describe('app component', () => {
    it('should render the compoenent', () => {
        expect.assertions(2);
        const closeModalAction = jest.fn();
        const setInitialSourceCodeMock = jest.fn();

        const component = (<App closeModal={closeModalAction}
                                setInitialSourceCode={setInitialSourceCodeMock}
                                showModal={false} />);
        const renderResult = render(component);
        expect(renderResult).not.toBeNull();

        expect(setInitialSourceCodeMock).toHaveBeenCalledTimes(1);
    });

    it('should show modal component', () => {
        expect.assertions(2);
        const closeModalAction = jest.fn();
        const setInitialSourceCodeMock = jest.fn();

        const component = (<App closeModal={closeModalAction}
                                setInitialSourceCode={setInitialSourceCodeMock}
                                showModal />);
        const renderResult = render(component);
        expect(renderResult).not.toBeNull();

        expect(setInitialSourceCodeMock).toHaveBeenCalledTimes(1);
    });

    it('should return mapStateToProps', () => {
        expect.assertions(1);
        const state = {showModal: true} as GlobalState;
        expect(mapStateToProps(state)).toStrictEqual(state);
    });

    it('should return mapDispatchToProps', () => {
        expect.assertions(2);
        const dispatchMock = jest.fn();
        const {closeModal, setInitialSourceCode} = mapDispatchToProps(dispatchMock);

        closeModal();
        expect(dispatchMock).toHaveBeenCalledTimes(1);

        setInitialSourceCode();
        expect(dispatchMock).toHaveBeenCalledTimes(3);
    });
});
