import React from 'react';
import {render} from '@testing-library/react';

import {HelpContentComponent} from '../../assets/help';

describe('help component', () => {
    it('should render component', () => {
        expect.assertions(1);

        const result = render(<HelpContentComponent />);

        expect(result.container).toBeDefined();
    });
});
