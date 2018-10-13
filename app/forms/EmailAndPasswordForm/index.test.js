// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps } from 'lib/testResources';

import EmailAndPasswordForm, { PureEmailAndPasswordForm } from '.';

describe(`EmailAndPasswordForm`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureEmailAndPasswordForm {...dummyProviderProps.translatorProps} {...dummyProviderProps.formProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`allows rendering children instead of default form buttons`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EmailAndPasswordForm>
          <p data-test-id="test-form-children">replacement submit buttons would go here</p>
        </EmailAndPasswordForm>
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('[data-test-id="test-form-children"]')).toHaveLength(1);
  });

});
