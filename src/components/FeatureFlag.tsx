import React from 'react';

export type Direction = 'left' | 'right';

/**
 * FeatreFlag Props.
 */
interface FeatureFlagProps {
    feature: string;
    side: Direction;
}

/**
 * FeatureFlag Component
 *
 * @param props FeatureFlag props.
 * @returns FeatureFlag Component.
 */
export default function FeatureFlag({feature, side}: FeatureFlagProps): JSX.Element {
    console.log(feature, side, side === 'right');
    const classes = side === 'right' ?
      'field has-addons' :
      'field has-addons has-addons-centered';

    return (
        <div className={classes}>
            <label className="checkbox label">
                <input type="checkbox" />
                {feature}
            </label>
        </div>
    );
}