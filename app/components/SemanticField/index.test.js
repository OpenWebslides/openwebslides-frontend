// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { Dropdown, Checkbox } from 'semantic-ui-react';
import { Formik } from 'formik';

import SemanticField from '.';

describe(`SemanticField`, (): void => {

  let dummyOptions: $ReadOnlyArray<any>;
  let dummyValue: string;

  beforeEach((): void => {
    dummyOptions = [
      { key: 'test1', value: 'test1', text: 'Test 1' },
      { key: 'test2', value: 'test2', text: 'Test 2' },
      { key: 'test3', value: 'test3', text: 'Test 3' },
    ];
    dummyValue = 'test1';
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <SemanticField />,
    );

    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the passed Dropdown component`, (): void => {
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
    enzymeWrapper.find('Dropdown').props().onBlur(jest.fn());
    enzymeWrapper.find('Dropdown').props().onBlur(jest.fn(), { value: true });

    expect(enzymeWrapper.find('Formik').instance().state.values.test).toStrictEqual('test2');
    expect(enzymeWrapper.find('Formik').instance().state.touched.test).toBe(true);
  });

  it(`renders the passed Checkbox`, (): void => {
    const enzymeWrapper = mount(
      <Formik
        initialValues={{ test: true }}
        render={(): React.Node => {
          return (
            <SemanticField
              component={Checkbox}
              name="test"
              checked={true}
            />
          );
        }}
      />,
    );

    expect(enzymeWrapper.find('Checkbox')).toHaveLength(1);
    expect(enzymeWrapper.find('Checkbox').props().checked).toBe(true);

    // Simulate events
    // Enzyme does not support event propagation yet, so we cannot test out
    // the onChange callback by changing the dropdown value
    // https://github.com/airbnb/enzyme/issues/308
    enzymeWrapper.find('Checkbox').props().onChange(null, { checked: false });
    enzymeWrapper.find('Checkbox').props().onBlur(jest.fn());
    enzymeWrapper.find('Checkbox').props().onBlur(jest.fn(), { checked: true });

    expect(enzymeWrapper.find('Formik').instance().state.values.test).toBe(false);
    expect(enzymeWrapper.find('Formik').instance().state.touched.test).toBe(true);
  });

});
