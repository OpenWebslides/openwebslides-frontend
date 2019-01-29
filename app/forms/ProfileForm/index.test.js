// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyUserData } from 'lib/testResources';
import { type DropdownValue } from 'types/forms';
import users from 'modules/users';

import ProfileForm, { PureProfileForm, type ProfileFormValues } from '.';

describe(`ProfileForm`, (): void => {

  let dummyFormProps: ProfileFormValues;
  let dummyUser: users.model.User;
  let dummyAvailableLocales: $ReadOnlyArray<DropdownValue>;
  let dummyAvailableGenders: $ReadOnlyArray<DropdownValue>;
  let dummyAvailableRoles: $ReadOnlyArray<DropdownValue>;
  let dummyAvailableCountries: $ReadOnlyArray<DropdownValue>;

  beforeEach((): void => {
    dummyFormProps = {
      name: 'dummyName',
      email: 'dummy@email',
      locale: 'en',
      alertEmails: true,
      age: 18,
      gender: users.model.genderTypes.MALE,
      role: users.model.roleTypes.LEARNER,
      country: 'BE',
    };
    dummyUser = dummyUserData.user;
    dummyAvailableLocales = [
      { key: 'en', value: 'en', text: 'English' },
      { key: 'nl', value: 'nl', text: 'Nederlands' },
      { key: 'fr', value: 'fr', text: 'Français' },
    ];
    dummyAvailableGenders = [
      { key: users.model.genderTypes.MALE, value: users.model.genderTypes.MALE, text: 'Male' },
      { key: users.model.genderTypes.FEMALE, value: users.model.genderTypes.FEMALE, text: 'Female' },
      { key: users.model.genderTypes.OTHER, value: users.model.genderTypes.OTHER, text: 'Other' },
    ];
    dummyAvailableRoles = [
      { key: users.model.roleTypes.LEARNER, value: users.model.roleTypes.LEARNER, text: 'Learner' },
      { key: users.model.roleTypes.TEACHER, value: users.model.roleTypes.TEACHER, text: 'Teacher' },
      { key: users.model.roleTypes.COTEACHER, value: users.model.roleTypes.COTEACHER, text: 'Coteacher' },
    ];
    dummyAvailableCountries = [
      { key: 'BE', value: 'BE', text: 'Belgium' },
    ];
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureProfileForm
        user={dummyUser}
        availableLocales={dummyAvailableLocales}
        availableGenders={dummyAvailableGenders}
        availableRoles={dummyAvailableRoles}
        availableCountries={dummyAvailableCountries}
        {...dummyProviderProps.translatorProps}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders children`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ProfileForm
          user={dummyUser}
          availableLocales={dummyAvailableLocales}
          availableGenders={dummyAvailableGenders}
          availableRoles={dummyAvailableRoles}
          availableCountries={dummyAvailableCountries}
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
          user={dummyUser}
          availableLocales={dummyAvailableLocales}
          availableGenders={dummyAvailableGenders}
          availableRoles={dummyAvailableRoles}
          availableCountries={dummyAvailableCountries}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="profile-form-field-name"] > input').props().value).toStrictEqual(dummyUser.name);
    expect(enzymeWrapper.find('[data-test-id="profile-form-field-email"] > input').props().value).toStrictEqual(dummyUser.email);
    expect(enzymeWrapper.find('[data-test-id="profile-form-field-locale"] Dropdown').props().value).toStrictEqual(dummyUser.locale);
    expect(enzymeWrapper.find('[data-test-id="profile-form-field-alert-emails"] > input').props().checked).toStrictEqual(dummyUser.alertEmails);
    expect(enzymeWrapper.find('[data-test-id="profile-form-field-age"] > input').props().value).toStrictEqual(dummyUser.age);
    expect(enzymeWrapper.find('[data-test-id="profile-form-field-gender"] Dropdown').props().value).toStrictEqual(dummyUser.gender);
    expect(enzymeWrapper.find('[data-test-id="profile-form-field-role"] Dropdown').props().value).toStrictEqual(dummyUser.role);
    expect(enzymeWrapper.find('[data-test-id="profile-form-field-country"] Dropdown').props().value).toStrictEqual(dummyUser.country);
  });

  it(`renders a dropdown box with the passed available locales`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ProfileForm
          user={dummyUser}
          availableLocales={dummyAvailableLocales}
          availableGenders={dummyAvailableGenders}
          availableRoles={dummyAvailableRoles}
          availableCountries={dummyAvailableCountries}
        />
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('Dropdown[name="locale"]')).toHaveLength(1);
    expect(enzymeWrapper.find('Dropdown[name="locale"] DropdownItem[value="nl"]')).toHaveLength(1);
    expect(enzymeWrapper.find('Dropdown[name="locale"] DropdownItem[value="en"]')).toHaveLength(1);
    expect(enzymeWrapper.find('Dropdown[name="locale"] DropdownItem[value="fr"]')).toHaveLength(1);
  });

  it(`renders a dropdown box with the passed available genders`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ProfileForm
          user={dummyUser}
          availableLocales={dummyAvailableLocales}
          availableGenders={dummyAvailableGenders}
          availableRoles={dummyAvailableRoles}
          availableCountries={dummyAvailableCountries}
        />
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('Dropdown[name="gender"]')).toHaveLength(1);
    expect(enzymeWrapper.find(`Dropdown[name="gender"] DropdownItem[value="${users.model.genderTypes.MALE}"]`)).toHaveLength(1);
    expect(enzymeWrapper.find(`Dropdown[name="gender"] DropdownItem[value="${users.model.genderTypes.FEMALE}"]`)).toHaveLength(1);
    expect(enzymeWrapper.find(`Dropdown[name="gender"] DropdownItem[value="${users.model.genderTypes.OTHER}"]`)).toHaveLength(1);
  });

  it(`renders a dropdown box with the passed available roles`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ProfileForm
          user={dummyUser}
          availableLocales={dummyAvailableLocales}
          availableGenders={dummyAvailableGenders}
          availableRoles={dummyAvailableRoles}
          availableCountries={dummyAvailableCountries}
        />
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('Dropdown[name="role"]')).toHaveLength(1);
    expect(enzymeWrapper.find(`Dropdown[name="role"] DropdownItem[value="${users.model.roleTypes.LEARNER}"]`)).toHaveLength(1);
    expect(enzymeWrapper.find(`Dropdown[name="role"] DropdownItem[value="${users.model.roleTypes.TEACHER}"]`)).toHaveLength(1);
    expect(enzymeWrapper.find(`Dropdown[name="role"] DropdownItem[value="${users.model.roleTypes.COTEACHER}"]`)).toHaveLength(1);
  });

  it(`renders a dropdown box with the passed available countries`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ProfileForm
          user={dummyUser}
          availableLocales={dummyAvailableLocales}
          availableGenders={dummyAvailableGenders}
          availableRoles={dummyAvailableRoles}
          availableCountries={dummyAvailableCountries}
        />
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('Dropdown[name="country"]')).toHaveLength(1);
    expect(enzymeWrapper.find(`Dropdown[name="country"] DropdownItem[value="${'BE'}"]`)).toHaveLength(1);
  });

  it(`validates form props`, (): void => {
    const enzymeWrapper = shallow(
      <PureProfileForm
        user={dummyUser}
        availableLocales={dummyAvailableLocales}
        availableGenders={dummyAvailableGenders}
        availableRoles={dummyAvailableRoles}
        availableCountries={dummyAvailableCountries}
        {...dummyProviderProps.translatorProps}
      />,
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

    expect(validate({ ...dummyFormProps, alertEmails: null })).toHaveProperty('alertEmails');

    expect(validate({ ...dummyFormProps, age: null })).toHaveProperty('age');

    expect(validate({ ...dummyFormProps, gender: 'foo' })).toHaveProperty('gender');
    expect(validate({ ...dummyFormProps, gender: users.model.genderTypes.MALE })).not.toHaveProperty('gender');

    expect(validate({ ...dummyFormProps, role: 'foo' })).toHaveProperty('role');
    expect(validate({ ...dummyFormProps, role: users.model.roleTypes.LEARNER })).not.toHaveProperty('role');

    expect(validate({ ...dummyFormProps, country: 'foo' })).toHaveProperty('country');
    expect(validate({ ...dummyFormProps, country: 'BE' })).not.toHaveProperty('country');
  });

});
