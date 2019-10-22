import * as React from 'react';
import { shallow, mount, render } from 'enzyme';

import { App } from '../components/App';

describe('App Component',	() => {
  it('should render without errors', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should contain a p element', () => {
    expect(shallow(<App />).find('p').length).toBe(1);
  });
});
