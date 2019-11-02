import * as React from 'react';
import { shallow } from 'enzyme';

import { App } from '../components/App';

describe('App Component',	() => {
  it('should render without errors', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });
});
