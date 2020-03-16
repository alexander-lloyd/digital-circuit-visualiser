import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import {ExamplesList, mapDispatchToProps, mapStateToProps} from '../../components/ExamplesList';
import {Examples} from 'assets/examples';

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

    it('should a set of examples', () => {
        expect.assertions(4);
        const setSourceMock = jest.fn();

        const examples: Examples = {
            test: {
                name: 'test',
                description: '',
                source: 'AND'
            },
            test2: {
                name: 'test2',
                description: '',
                source: 'OR'
            }
        };

        const renderResult = render(<ExamplesList examples={examples}
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
        <option
          value="test"
        >
          test
        </option>
        <option
          value="test2"
        >
          test2
        </option>
      </select>
    </div>
  </div>
</div>
`);

        const exampleSelect = getByTestId('examples');

        expect(exampleSelect).toBeInTheDocument();

        expect(exampleSelect.children).toHaveLength(3);
    });

    it('should map state to props', () => {
        expect.assertions(1);
        expect(mapStateToProps()).not.toBeNull();
    });

    it('should map dispatch to props', () => {
        expect.assertions(1);
        const dispatchMock = jest.fn();

        const {setSourceCode} = mapDispatchToProps(dispatchMock);
        setSourceCode('ABC');
        expect(dispatchMock).toHaveBeenCalledTimes(2);
    });
});
