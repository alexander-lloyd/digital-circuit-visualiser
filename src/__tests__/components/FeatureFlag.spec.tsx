import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FeatureFlag from '../../components/FeatureFlag';

describe('featureflag component', () => {
    it('should render the component', () => {
        expect.assertions(1);
        const feature = 'FEATURE';
        const onCheckedMock = jest.fn();
        const onUncheckedMock = jest.fn();

        const component = (<FeatureFlag checked
                                        feature={feature}
                                        onChecked={onCheckedMock}
                                        onUnchecked={onUncheckedMock} />);
        const renderResult = render(component);

        expect(renderResult).not.toBeNull();
    });

    it('should check the checkbox', () => {
        expect.assertions(1);
        const feature = 'FEATURE';
        const onCheckedMock = jest.fn();
        const onUncheckedMock = jest.fn();

        const component = (<FeatureFlag checked={false}
                                        feature={feature}
                                        onChecked={onCheckedMock}
                                        onUnchecked={onUncheckedMock} />);
        const {getByTestId} = render(component);

        const checkbox = getByTestId('feature-checkbox');
        fireEvent.click(checkbox);

        expect(onCheckedMock).toHaveBeenCalledTimes(1);
    });

    it('should uncheck the checkbox', () => {
        expect.assertions(1);
        const feature = 'FEATURE';
        const onCheckedMock = jest.fn();
        const onUncheckedMock = jest.fn();

        const component = (<FeatureFlag checked
                                        feature={feature}
                                        onChecked={onCheckedMock}
                                        onUnchecked={onUncheckedMock} />);
        const {getByTestId} = render(component);

        const checkbox = getByTestId('feature-checkbox');
        fireEvent.click(checkbox);

        expect(onUncheckedMock).toHaveBeenCalledTimes(1);
    });
});
