// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps } from 'lib/testResources';

import ResetPasswordForm, { PureResetPasswordForm, type ResetPasswordFormValues } from '.';

describe(`ResetPasswordForm`, (): void => {

  let dummyResetPasswordToken: string;
  let dummyFormProps: ResetPasswordFormValues;

  beforeEach((): void => {
    dummyResetPasswordToken = 'foobarToken';
    dummyFormProps = {
      password: 'abcd1234',
      repeatPassword: 'abcd1234',
      resetPasswordToken: dummyResetPasswordToken,
    };
  });

  it(`renders without errors`, (): void => {

    const enzymeWrapper = shallow(
      <PureResetPasswordForm
        {...dummyProviderProps.translatorProps}
        resetPasswordToken={dummyResetPasswordToken}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders default buttons if no children are specified`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ResetPasswordForm />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureSubmitButtonGroup')).toHaveLength(1);
  });

  it(`allows rendering children instead of default form buttons`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ResetPasswordForm>
          <p data-test-id="test-form-children">replacement submit buttons would go here</p>
        </ResetPasswordForm>
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('[data-test-id="test-form-children"]')).toHaveLength(1);
  });

  it(`validates form props`, (): void => {
    const enzymeWrapper = shallow(<PureResetPasswordForm {...dummyProviderProps.translatorProps} />);
    const validate = enzymeWrapper.instance().validateForm;

    expect(validate(dummyFormProps)).toStrictEqual({});

    expect(validate({ ...dummyFormProps, password: '' })).toHaveProperty('password');
    expect(validate({ ...dummyFormProps, password: 'abcde' })).toHaveProperty('password');
    expect(validate({ ...dummyFormProps, password: 'abcdef' })).not.toHaveProperty('password');

    expect(validate({ ...dummyFormProps, password: 'abcdef', repeatPassword: 'abcdeg' })).toHaveProperty('repeatPassword');
    expect(validate({ ...dummyFormProps, password: 'abcdef', repeatPassword: 'abcdef' })).not.toHaveProperty('repeatPassword');

    expect(validate({ ...dummyFormProps, resetPasswordToken: '' })).toHaveProperty('resetPasswordToken');
  });

});
