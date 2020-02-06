import React from 'react';

const featureFlags: [string, string][] = [
    ['feat1', 'Feature 1'],
    ['feat2', 'Feature 2'],
    ['feat3', 'Feature 3']
];

export default function FeatureFlags(): JSX.Element {
    return (
        <div className="columns">
            <div className="column">
                { featureFlags.
                    filter((_, i) => i % 2 == 0)
                    .map(([featid, feature]) =>
                        <div className="field" key={featid}>
                            <label className="checkbox"><input type="checkbox" />{ feature }</label>
                        </div>
                    )
                }
            </div>
            <div className="column">
            { featureFlags.
                    filter((_, i) => i % 2 == 1)
                    .map(([featid, feature]) =>
                        <div className="field" key={featid}>
                            <label className="checkbox"><input type="checkbox" />{ feature }</label>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
