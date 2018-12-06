// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { Dropdown } from 'semantic-ui-react';
import { Formik } from 'formik';

import SemanticField from '.';

describe(`SemanticField`, (): void => {

  let dummyOptions: $ReadOnlyArray<any>;
  let dummyValue: string;
  let dummyProps: any;

  beforeEach((): void => {
    dummyOptions = [
      { key: 'test1', value: 'test1', text: 'Test 1' },
      { key: 'test2', value: 'test2', text: 'Test 2' },
      { key: 'test3', value: 'test3', text: 'Test 3' },
    ];
    dummyValue = 'test1';
    dummyProps = {
      setFieldValue: jest.fn(),
    };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <SemanticField />,
    );

    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the passed component`, (): void => {
    const enzymeWrapper = mount(
      <Formik
        initialValues={{ test: dummyValue }}
        render={(): React.Node => {
          return (
            <SemanticField
              component={Dropdown}
              name="test"
              options={dummyOptions}
              value={dummyValue}
            />
          );
        }}
      />,
    );

    expect(enzymeWrapper.find('Dropdown')).toHaveLength(1);

    // Simulate events
    // Enzyme does not support event propagation yet, so we cannot test out
    // the onChange callback by changing the dropdown value
    // https://github.com/airbnb/enzyme/issues/308
    enzymeWrapper.find('Dropdown').props().onChange(null, { value: 'test2' });
    enzymeWrapper.find('Dropdown').props().onBlur(null, { value: 'test2' });

    expect(enzymeWrapper.find('Formik').instance().state.values.test).toStrictEqual('test2');
    expect(enzymeWrapper.find('Formik').instance().state.touched.test).toStrictEqual('test2');
  });

});
