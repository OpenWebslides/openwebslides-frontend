// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders } from 'lib/testResources';

import PasswordForm, { PurePasswordForm, type PasswordFormValues } from '.';

describe(`PasswordForm`, (): void => {

  let dummyFormProps: PasswordFormValues;
  let dummyOnSubmit: any;

  beforeEach((): void => {
    dummyFormProps = {
      currentPassword: 'abcd1233',
      password: 'abcd1234',
      repeatPassword: 'abcd1234',
    };
    dummyOnSubmit = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PurePasswordForm onSubmit={dummyOnSubmit}>
        <p>children</p>
      </PurePasswordForm>,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders children`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <PasswordForm onSubmit={dummyOnSubmit}>
          <p data-test-id="test-form-children">replacement submit buttons would go here</p>
        </PasswordForm>
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('[data-test-id="test-form-children"]')).toHaveLength(1);
  });

  it(`validates form props`, (): void => {
    const enzymeWrapper = shallow(
      <PurePasswordForm onSubmit={dummyOnSubmit}>
        <p>children</p>
      </PurePasswordForm>,
    );
    const validate = enzymeWrapper.instance().validateForm;

    expect(validate(dummyFormProps)).toStrictEqual({});

    expect(validate({ ...dummyFormProps, currentPassword: '' })).toHaveProperty('currentPassword');
    expect(validate({ ...dummyFormProps, currentPassword: 'abcde' })).toHaveProperty('currentPassword');
    expect(validate({ ...dummyFormProps, currentPassword: 'abcdef' })).not.toHaveProperty('currentPassword');

    expect(validate({ ...dummyFormProps, password: '' })).toHaveProperty('password');
    expect(validate({ ...dummyFormProps, password: 'abcde' })).toHaveProperty('password');
    expect(validate({ ...dummyFormProps, password: 'abcdef' })).not.toHaveProperty('password');

    expect(validate({ ...dummyFormProps, currentPassword: 'abcdef', password: 'abcdef' })).toHaveProperty('password');
    expect(validate({ ...dummyFormProps, currentPassword: 'abcdef', password: 'abcdeg' })).not.toHaveProperty('password');

    expect(validate({ ...dummyFormProps, password: 'abcdef', repeatPassword: 'abcdeg' })).toHaveProperty('repeatPassword');
    expect(validate({ ...dummyFormProps, password: 'abcdef', repeatPassword: 'abcdef' })).not.toHaveProperty('repeatPassword');
  });

});
