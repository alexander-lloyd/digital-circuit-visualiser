import React, {ChangeEvent} from 'react';

/**
 * FeatureFlag Props.
 */
interface FeatureFlagProps {
    checked: boolean;
    feature: string;
    onChecked: () => void;
    onUnchecked: () => void;
}

/**
 * FeatureFlag Component
 *
 * @param props FeatureFlag props.
 * @returns FeatureFlag Component.
 */
export default function FeatureFlag({checked, feature, onChecked, onUnchecked}: FeatureFlagProps): JSX.Element {
    /**
     * Emit onChecked on Input checked and Unchecked otherwise.
     *
     * @param event React MouseEvent.
     */
    function onChange(event: ChangeEvent): void {
        const element = event.nativeEvent.target as HTMLInputElement;

        if (element.checked) {
            onChecked();
        } else {
            onUnchecked();
        }
    }

    return (
        <label className="checkbox">
            <input checked={checked}
                   onChange={onChange}
                   type="checkbox" />
            {feature}
        </label>
    );
}
