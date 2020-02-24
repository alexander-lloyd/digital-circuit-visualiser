import React from 'react';
import {shallow} from 'enzyme';

import App from '../containers/App/App';

describe('app Component', () => {
    it('should render without errors', () => {
        expect.assertions(1);
        const wrapper = shallow(<App />);

        expect(wrapper).toMatchInlineSnapshot('ShallowWrapper {}');
    });
});
