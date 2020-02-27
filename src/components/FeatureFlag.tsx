import React, {MouseEvent as ReactMouseEvent} from 'react';

/**
 * FeatureFlag Props.
 */
interface FeatureFlagProps {
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
export default function FeatureFlag({feature, onChecked, onUnchecked}: FeatureFlagProps): JSX.Element {
    /**
     * Emit onChecked on Input checked and Unchecked otherwise.
     *
     * @param event React MouseEvent.
     */
    function onClick(event: ReactMouseEvent): void {
        const element = event.nativeEvent.target as HTMLInputElement;

        if (element.checked) {
            onChecked();
        } else {
            onUnchecked();
        }
    }

    return (
        <div className="field">
            <label className="checkbox label">
                <input onClick={onClick}
                       type="checkbox" />
                {feature}
            </label>
        </div>
    );
}
