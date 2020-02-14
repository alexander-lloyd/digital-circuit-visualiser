import React from 'react';

export type Direction = 'left' | 'right';

/**
 * FeatreFlag Props.
 */
interface FeatureFlagProps {
    feature: string;
}

/**
 * FeatureFlag Component
 *
 * @param props FeatureFlag props.
 * @returns FeatureFlag Component.
 */
export default function FeatureFlag({feature}: FeatureFlagProps): JSX.Element {
    return (
        <div className="field">
            <label className="checkbox label">
                <input type="checkbox" />
                {feature}
            </label>
        </div>
    );
}