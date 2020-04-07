import React from 'react';
import {render} from '@testing-library/react';
import {FeatureFlags, mapDispatchToProps, mapStateToProps} from '../../components/FeatureFlags';
import {Features, FEATURES} from '../../assets/features';

import {GlobalState} from '../../containers/App/types';

describe('feature flags component', () => {
    it('should render component', () => {
        expect.assertions(1);
        const setFlagMock = jest.fn();
        const unsetFlagMock = jest.fn();
        const featureFlags = {};
        const features: Features = [];
        const component = (<FeatureFlags featureFlags={featureFlags}
                                         features={features}
                                         setFlag={setFlagMock}
                                         unsetFlag={unsetFlagMock} />);
        const renderResult = render(component);
        expect(renderResult).not.toBeNull();
    });

    it('should render features', () => {
        expect.assertions(1);
        const setFlagMock = jest.fn();
        const unsetFlagMock = jest.fn();
        const featureFlags = {
            RENDER_UNIT_SQUARES: true
        };
        const features: Features = FEATURES;
        const component = (<FeatureFlags featureFlags={featureFlags}
                                         features={features}
                                         setFlag={setFlagMock}
                                         unsetFlag={unsetFlagMock} />);
        const renderResult = render(component);
        expect(renderResult).not.toBeNull();
    });

    it('should map state to props', () => {
        expect.assertions(1);
        const state = {
            featureFlags: {
                RENDER_UNIT_SQUARES: true
            }
        } as unknown as GlobalState;

        expect(mapStateToProps(state)).toStrictEqual(state);
    });

    it('should map dispatch to props', () => {
        expect.assertions(1);
        const dispatchMock = jest.fn();

        const actions = mapDispatchToProps(dispatchMock);

        actions.setFlag('RENDER_UNIT_SQUARE')();
        actions.unsetFlag('RENDER_UNIT_SQUARE')();

        expect(dispatchMock).toHaveBeenCalledTimes(2);
    });
});
