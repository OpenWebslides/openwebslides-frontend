// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps } from 'lib/testResources';

import UserForm, { PureUserForm } from '.';

describe(`UserForm`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureUserForm {...dummyProviderProps.translatorProps} {...dummyProviderProps.formProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`checks its checkbox #TEMP`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <UserForm />
      </DummyProviders>,
    );

    const checkboxNode = enzymeWrapper.find('[data-test-id="user-form-tos-accepted"]').hostNodes();
    checkboxNode.simulate('change');
    // #TODO
  });

});
