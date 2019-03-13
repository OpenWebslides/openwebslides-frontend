// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders } from 'lib/testResources';

import NewUserForm, { PureNewUserForm, type NewUserFormValues } from '.';

describe(`NewUserForm`, (): void => {

  let dummyFormProps: NewUserFormValues;
  let dummyOnSubmit: any;

  beforeEach((): void => {
    dummyFormProps = {
      email: 'dummy@email',
      name: 'dummyName',
      password: 'abcd1234',
      repeatPassword: 'abcd1234',
      tosAccepted: true,
    };
    dummyOnSubmit = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureNewUserForm onSubmit={dummyOnSubmit} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders default buttons if no children are specified`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <NewUserForm onSubmit={dummyOnSubmit} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureSubmitButtonGroup')).toHaveLength(1);
  });

  it(`allows rendering children instead of default form buttons`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <NewUserForm onSubmit={dummyOnSubmit}>
          <p data-test-id="test-form-children">replacement submit buttons would go here</p>
        </NewUserForm>
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('[data-test-id="test-form-children"]')).toHaveLength(1);
  });

  it(`validates form props`, (): void => {
    const enzymeWrapper = shallow(
      <PureNewUserForm onSubmit={dummyOnSubmit} />,
    );
    const validate = enzymeWrapper.instance().validateForm;

    expect(validate(dummyFormProps)).toStrictEqual({});

    expect(validate({ ...dummyFormProps, email: '' })).toHaveProperty('email');
    expect(validate({ ...dummyFormProps, email: 'foo' })).toHaveProperty('email');
    expect(validate({ ...dummyFormProps, email: 'foo@bar' })).not.toHaveProperty('email');

    expect(validate({ ...dummyFormProps, name: '' })).toHaveProperty('name');

    expect(validate({ ...dummyFormProps, password: '' })).toHaveProperty('password');
    expect(validate({ ...dummyFormProps, password: 'abcde' })).toHaveProperty('password');
    expect(validate({ ...dummyFormProps, password: 'abcdef' })).not.toHaveProperty('password');

    expect(validate({ ...dummyFormProps, password: 'abcdef', repeatPassword: 'abcdeg' })).toHaveProperty('repeatPassword');
    expect(validate({ ...dummyFormProps, password: 'abcdef', repeatPassword: 'abcdef' })).not.toHaveProperty('repeatPassword');

    expect(validate({ ...dummyFormProps, tosAccepted: false })).toHaveProperty('tosAccepted');
  });

});
