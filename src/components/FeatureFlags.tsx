/* eslint no-magic-numbers: ["warn", { ignore: [0, 1, 2] }] */
import React from 'react';
import {connect} from 'react-redux';

import FeatureFlag from './FeatureFlag';

import {FEATURES_KEYS, Features} from '../assets/features';
import * as actions from '../containers/App/actions';
import {GlobalState, DispatchFunction} from '../containers/App/types';

/**
 * Feature Flags Component State.
 */
interface FeatureFlagsState {
    featureFlags: {[feature: string]: boolean};
}

/**
 * Feature Flag Actions.
 */
interface FeatureFlagsActions {
    setFlag: (name: FEATURES_KEYS) => (() => void);
    unsetFlag: (name: FEATURES_KEYS) => (() => void);
}

/**
 * Feature Flag Props.
 */
interface FeatureFlagProps extends FeatureFlagsState, FeatureFlagsActions {
    features: Features;
}

/**
 * Feature Flags Component.
 *
 * @param props FeatureFlagProps.
 * @returns Feature Flags Component.
 */
export function FeatureFlags({setFlag, unsetFlag, featureFlags, features}: FeatureFlagProps): JSX.Element {
    return (
        <div className="container">
            {
                features.
                    map(([featureId, feature]) => (
                        <FeatureFlag checked={featureFlags[featureId] || false}
                                     feature={feature}
                                     key={featureId}
                                     onChecked={setFlag(featureId)}
                                     onUnchecked={unsetFlag(featureId)} />
                    ))
            }
        </div>
    );
}

/**
 * Map state to props.
 *
 * @param state Global State.
 * @returns Component Props.
 */
export function mapStateToProps(state: GlobalState): FeatureFlagsState {
    const {featureFlags} = state;
    return {
        featureFlags
    };
}

/**
 * Map Dispatch to Props.
 *
 * @param dispatch Action dispatcher.
 * @returns Props.
 */
export function mapDispatchToProps(dispatch: DispatchFunction): FeatureFlagsActions {
    return {
        setFlag: (feature: FEATURES_KEYS): (() => void) => (): void => dispatch(actions.setFeatureFlag(feature, true)),
        unsetFlag: (feature: FEATURES_KEYS): (() => void) => (): void => dispatch(actions.setFeatureFlag(feature, false))
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeatureFlags);
