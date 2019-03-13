// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyUserData } from 'lib/testResources';
import { type DropdownValue } from 'types/forms';
import users from 'modules/users';

import ProfileForm, { PureProfileForm, type ProfileFormValues } from '.';

describe(`ProfileForm`, (): void => {

  let dummyFormProps: ProfileFormValues;
  let dummyUser: users.model.User;
  let dummyAvailableLocales: $ReadOnlyArray<DropdownValue>;
  let dummyOnSubmit: any;

  beforeEach((): void => {
    dummyFormProps = {
      name: 'dummyName',
      email: 'dummy@email',
      locale: 'en',
      alertEmails: true,
    };
    dummyUser = dummyUserData.user;
    dummyAvailableLocales = [
      { key: 'en', value: 'en', text: 'English' },
      { key: 'nl', value: 'nl', text: 'Nederlands' },
      { key: 'fr', value: 'fr', text: 'Français' },
    ];
    dummyOnSubmit = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureProfileForm
        onSubmit={dummyOnSubmit}
        user={dummyUser}
        availableLocales={dummyAvailableLocales}
      >
        <p>children</p>
      </PureProfileForm>,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders children`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ProfileForm
          onSubmit={dummyOnSubmit}
          user={dummyUser}
          availableLocales={dummyAvailableLocales}
        >
          <p data-test-id="test-form-children">replacement submit buttons would go here</p>
        </ProfileForm>
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('[data-test-id="test-form-children"]')).toHaveLength(1);
  });

  it(`defaults the form fields to the user's profile details`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ProfileForm
          onSubmit={dummyOnSubmit}
          user={dummyUser}
          availableLocales={dummyAvailableLocales}
        >
          <p>children</p>
        </ProfileForm>
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="profile-form-field-name"] > input').props().value).toStrictEqual(dummyUser.name);
  });

  it(`renders a dropdown box with the passed available locales`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ProfileForm
          onSubmit={dummyOnSubmit}
          user={dummyUser}
          availableLocales={dummyAvailableLocales}
        >
          <p>children</p>
        </ProfileForm>
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('DropdownItem')).toHaveLength(3);
    expect(enzymeWrapper.find('DropdownItem[value="nl"]')).toHaveLength(1);
    expect(enzymeWrapper.find('DropdownItem[value="en"]')).toHaveLength(1);
    expect(enzymeWrapper.find('DropdownItem[value="fr"]')).toHaveLength(1);
  });

  it(`validates form props`, (): void => {
    const enzymeWrapper = shallow(
      <PureProfileForm
        onSubmit={dummyOnSubmit}
        user={dummyUser}
        availableLocales={dummyAvailableLocales}
      >
        <p>children</p>
      </PureProfileForm>,
    );
    const validate = enzymeWrapper.instance().validateForm;

    expect(validate(dummyFormProps)).toStrictEqual({});

    expect(validate({ ...dummyFormProps, name: '' })).toHaveProperty('name');

    expect(validate(dummyFormProps)).toStrictEqual({});

    expect(validate({ ...dummyFormProps, email: '' })).toHaveProperty('email');
    expect(validate({ ...dummyFormProps, email: 'foo' })).toHaveProperty('email');
    expect(validate({ ...dummyFormProps, email: 'foo@bar' })).not.toHaveProperty('email');

    expect(validate({ ...dummyFormProps, locale: 'foo' })).toHaveProperty('locale');
    expect(validate({ ...dummyFormProps, locale: 'en' })).not.toHaveProperty('locale');

    // $FlowFixMe value intended to be invalid
    expect(validate({ ...dummyFormProps, alertEmails: null })).toHaveProperty('alertEmails');
  });

});
