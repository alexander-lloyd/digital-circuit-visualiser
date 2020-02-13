import React from 'react';

import FeatureFlag from './FeatureFlag';

const featureFlags: [string, string][] = [
    ['feat1', 'Feature 1'],
    ['feat2', 'Feature 2'],
    ['feat3', 'Feature 3']
];

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
                featureFlags.
                    filter((_, i) => i % 2 == 0).
                    map(([featureId, feature]) => (
                        <FeatureFlag feature={feature}
                                     key={featureId}
                                     side='left' />
                    ))
                }
            </div>
            <div className="column">
                {
                featureFlags.
                    filter((_, i) => i % 2 == 1)
                    .map(([featureId, feature]) => (
                        <FeatureFlag feature={feature}
                                     key={featureId}
                                     side='right' />
                    ))
                }
            </div>
        </div>
    );
}
