/* eslint no-magic-numbers: ["warn", { ignore: [0, 1, 2] }] */
import React from 'react';
import {connect} from 'react-redux';

import FeatureFlag from './FeatureFlag';

import {FEATURES, FEATURES_KEYS} from '../assets/features';
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
interface FeatureFlagProps extends FeatureFlagsState, FeatureFlagsActions {}

/**
 * Feature Flags Component.
 *
 * @param props FeatureFlagProps.
 * @returns Feature Flags Component.
 */
export function FeatureFlags({setFlag, unsetFlag, featureFlags}: FeatureFlagProps): JSX.Element {
    return (
        <div className="columns">
            <div className="column">
                {
                    FEATURES.
                        filter((_, i) => i % 2 === 0).
                        map(([featureId, feature]) => (
                            <FeatureFlag checked={featureFlags[featureId] || false}
                                         feature={feature}
                                         key={featureId}
                                         onChecked={setFlag(featureId)}
                                         onUnchecked={unsetFlag(featureId)} />
                        ))
                }
            </div>
            <div className="column">
                {
                    FEATURES.
                        filter((_, i) => i % 2 === 1).
                        map(([featureId, feature]) => (
                            <FeatureFlag checked={featureFlags[featureId] || false}
                                         feature={feature}
                                         key={featureId}
                                         onChecked={setFlag(featureId)}
                                         onUnchecked={unsetFlag(featureId)} />))
                }
            </div>
        </div>
    );
}

/**
 * Map state to props.
 *
 * @param state Global State.
 * @returns Component Props.
 */
function mapStateToProps(state: GlobalState): FeatureFlagsState {
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
function mapDispatchToProps(dispatch: DispatchFunction): FeatureFlagsActions {
    return {
        setFlag: (feature: FEATURES_KEYS): (() => void) => (): void => dispatch(actions.setFeatureFlag(feature, true)),
        unsetFlag: (feature: FEATURES_KEYS): (() => void) => (): void => dispatch(actions.setFeatureFlag(feature, false))
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeatureFlags);
