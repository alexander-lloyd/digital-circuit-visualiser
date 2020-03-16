import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import {ExamplesList} from '../../components/ExamplesList';

describe('example list component', () => {
    it('should render an empty set of examples', () => {
        expect.assertions(5);
        const setSourceMock = jest.fn();

        const renderResult = render(<ExamplesList examples={{}}
                                                  setSourceCode={setSourceMock} />);

        expect(renderResult).not.toBeNull();
        const {container, getByTestId} = renderResult;

        expect(container.firstChild).toMatchInlineSnapshot(`
            <div
              class="field has-addons"
            >
              <div
                class="control is-expanded"
              >
                <div
                  class="select is-fullwidth"
                >
                  <select
                    data-testid="examples"
                    name="examples"
                  >
                    <option
                      disabled=""
                      selected=""
                      value="DEFAULT"
                    >
                      Select an Example
                    </option>
                  </select>
                </div>
              </div>
            </div>
        `);

        const exampleSelect = getByTestId('examples');

        expect(exampleSelect).toBeInTheDocument();

        expect(exampleSelect.children).toHaveLength(1);
        expect(setSourceMock).not.toHaveBeenCalled();
    });
});
