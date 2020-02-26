/* eslint no-magic-numbers: ["warn", { ignore: [0, 1, 2] }] */
import React from 'react';

import FeatureFlag from './FeatureFlag';

import {FEATURES} from '../assets/features';

/**
 * Feature Flags Component.
 *
 * @returns Feature Flags Component.
 */
export default function FeatureFlags(): JSX.Element {
    return (
        <div className="columns">
            <div className="column">
                {
                    FEATURES.
                        filter((_, i) => i % 2 === 0).
                        map(([featureId, feature]) => (
                            <FeatureFlag feature={feature}
                                         key={featureId} />))
                }
            </div>
            <div className="column">
                {
                    FEATURES.
                        filter((_, i) => i % 2 === 1).
                        map(([featureId, feature]) => (
                            <FeatureFlag feature={feature}
                                         key={featureId} />))
                }
            </div>
        </div>
    );
}
