// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps } from 'lib/testResources';

import ResetPasswordForm, { PureResetPasswordForm } from '.';

describe(`ResetPasswordForm`, (): void => {

  let dummyResetPasswordToken: string;

  beforeEach((): void => {
    dummyResetPasswordToken = 'foobarToken';
  });

  it(`renders without errors`, (): void => {

    const enzymeWrapper = shallow(
      <PureResetPasswordForm
        {...dummyProviderProps.translatorProps}
        {...dummyProviderProps.formProps}
        initialValues={{ resetPasswordToken: dummyResetPasswordToken }}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
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

});
