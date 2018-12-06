// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyUserData } from 'lib/testResources';
import users from 'modules/users';

import AccountForm, { PureAccountForm, type AccountFormValues } from '.';

describe(`AccountForm`, (): void => {

  let dummyUser = users.model.User;
  let dummyFormProps: AccountFormValues;
  let dummyAvailableLocales: $ReadOnlyArray<any>;

  beforeEach((): void => {
    dummyUser = dummyUserData.user;
    dummyFormProps = {
      email: 'dummy@email',
      locale: 'en',
      alertEmails: true,
    };
    dummyAvailableLocales = [
      { key: 'en', value: 'en', text: 'English' },
      { key: 'nl', value: 'nl', text: 'Nederlands' },
      { key: 'fr', value: 'fr', text: 'Français' },
    ];
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureAccountForm
        user={dummyUser}
        {...dummyProviderProps.translatorProps}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders children`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <AccountForm user={dummyUser}>
          <p data-test-id="test-form-children">replacement submit buttons would go here</p>
        </AccountForm>
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('[data-test-id="test-form-children"]')).toHaveLength(1);
  });

  it(`renders a dropdown box with the passed available locales`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <AccountForm
          user={dummyUser}
          availableLocales={dummyAvailableLocales}
        />
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('DropdownItem')).toHaveLength(3);
    expect(enzymeWrapper.find('DropdownItem[value="nl"]')).toHaveLength(1);
    expect(enzymeWrapper.find('DropdownItem[value="en"]')).toHaveLength(1);
    expect(enzymeWrapper.find('DropdownItem[value="fr"]')).toHaveLength(1);
  });

  it(`validates form props`, (): void => {
    const enzymeWrapper = shallow(
      <PureAccountForm
        availableLocales={dummyAvailableLocales}
        user={dummyUser}
        {...dummyProviderProps.translatorProps}
      />,
    );
    const validate = enzymeWrapper.instance().validateForm;

    expect(validate(dummyFormProps)).toStrictEqual({});

    expect(validate({ ...dummyFormProps, email: '' })).toHaveProperty('email');
    expect(validate({ ...dummyFormProps, email: 'foo' })).toHaveProperty('email');
    expect(validate({ ...dummyFormProps, email: 'foo@bar' })).not.toHaveProperty('email');

    expect(validate({ ...dummyFormProps, locale: 'foo' })).toHaveProperty('locale');
    expect(validate({ ...dummyFormProps, locale: 'en' })).not.toHaveProperty('locale');

    expect(validate({ ...dummyFormProps, alertEmails: null })).toHaveProperty('alertEmails');
  });

});
