// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps } from 'lib/testResources';

import UserForm, { PureUserForm, type UserFormValues } from '.';

describe(`UserForm`, (): void => {

  let dummyFormProps: UserFormValues;

  beforeEach((): void => {
    dummyFormProps = {
      email: 'dummy@email',
      name: 'dummyName',
      password: 'abcd1234',
      repeatPassword: 'abcd1234',
      tosAccepted: true,
    };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureUserForm {...dummyProviderProps.translatorProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders default buttons if no children are specified`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <UserForm />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureSubmitButtonGroup')).toHaveLength(1);
  });

  it(`allows rendering children instead of default form buttons`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <UserForm>
          <p data-test-id="test-form-children">replacement submit buttons would go here</p>
        </UserForm>
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('[data-test-id="test-form-children"]')).toHaveLength(1);
  });

  it(`validates form props`, (): void => {
    const enzymeWrapper = shallow(<PureUserForm {...dummyProviderProps.translatorProps} />);
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
