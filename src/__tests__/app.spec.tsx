import React from 'react';
import {shallow} from 'enzyme';

import {App} from '../containers/App/App';

describe('app Component', () => {
    it('should render without errors', () => {
        expect.assertions(1);
        /* eslint-disable-next-line jsdoc/require-jsdoc, @typescript-eslint/no-empty-function */
        const closeModalAction = (): void => {};
        const wrapper = shallow(<App closeModal={closeModalAction}
                                     showModal={false} />);

        expect(wrapper).toMatchInlineSnapshot('ShallowWrapper {}');
    });
});
