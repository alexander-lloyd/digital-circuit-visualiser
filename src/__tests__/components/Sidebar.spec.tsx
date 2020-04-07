import React, { ChangeEvent } from 'react';
import {render, getByText, fireEvent} from '@testing-library/react';

import {GlobalState} from '../../containers/App/types';
import {Sidebar, mapDispatchToProps, mapStateToProps} from '../../components/Sidebar';

jest.mock('../../components/ExamplesList', (): {} => ({
    __esModule: true,
    default: jest.fn().mockReturnValue(<p />)
}));

jest.mock('../../components/FeatureFlags', (): {} => ({
    __esModule: true,
    default: jest.fn().mockReturnValue(<p />)
}));

describe('sidebar component', () => {
    it('should render component', () => {
        expect.assertions(1);
        const setSourceCodeMock = jest.fn();
        const errorReason = null;
        const source = '';
        const component = (<Sidebar errorReason={errorReason}
                                    setSourceCode={setSourceCodeMock}
                                    source={source} />);
        const renderResult = render(component);
        expect(renderResult).not.toBeNull();
    });

    it('should not render an error with empty source', () => {
        expect.assertions(1);
        const setSourceCodeMock = jest.fn();
        const errorReason = 'Error Message';
        const source = '';
        const component = (<Sidebar errorReason={errorReason}
                                    setSourceCode={setSourceCodeMock}
                                    source={source} />);
        const {getByText} = render(component);
        expect(getByText(errorReason).hidden).toBe(true);
    });

    it('should display error message', () => {
        expect.assertions(1);
        const setSourceCodeMock = jest.fn();
        const errorReason = 'Error Message';
        const source = 'Invalid Syntax';
        const component = (<Sidebar errorReason={errorReason}
                                    setSourceCode={setSourceCodeMock}
                                    source={source} />);
        const {getByText} = render(component);
        expect(getByText(errorReason).hidden).toBe(false);
    });

    it('should fire source event when key is entered', () => {
        expect.assertions(1);
        const setSourceCodeMock = jest.fn();
        const errorReason = '';
        const source = '';
        const component = (<Sidebar errorReason={errorReason}
                                    setSourceCode={setSourceCodeMock}
                                    source={source} />);
        const {getByTestId} = render(component);
        const element = getByTestId('source-area') as HTMLTextAreaElement;
        fireEvent.change(element, {target: {value: 'abc'}});
        expect(setSourceCodeMock).toHaveBeenCalledTimes(1);
    });

    it('should map state to props', () => {
        expect.assertions(1);
        const errorString = 'Error';
        const source = 'source';
        const state = {
            errorString,
            code: source
        } as unknown as GlobalState;

        expect(mapStateToProps(state)).toStrictEqual({
            errorReason: errorString,
            source
        });
    });

    it('should map dispatch to props', () => {
        expect.assertions(1);
        const dispatchMock = jest.fn();

        const actions = mapDispatchToProps(dispatchMock);

        actions.setSourceCode('');

        expect(dispatchMock).toHaveBeenCalledTimes(2);
    });
});
