// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyUserData } from 'lib/testResources';
import users from 'modules/users';

import ProfileForm, { PureProfileForm, type ProfileFormValues } from '.';

describe(`ProfileForm`, (): void => {

  let dummyFormProps: ProfileFormValues;
  let dummyUser: users.model.User;

  beforeEach((): void => {
    dummyFormProps = {
      name: 'dummyName',
    };
    dummyUser = dummyUserData.user;
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureProfileForm {...dummyProviderProps.translatorProps} user={dummyUser} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders children`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ProfileForm user={dummyUser}>
          <p data-test-id="test-form-children">replacement submit buttons would go here</p>
        </ProfileForm>
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('[data-test-id="test-form-children"]')).toHaveLength(1);
  });

  it(`defaults the form fields to the user's profile details`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ProfileForm user={dummyUser} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="profile-form-field-name"] > input').props().value).toStrictEqual(dummyUser.name);
  });

  it(`validates form props`, (): void => {
    const enzymeWrapper = shallow(<PureProfileForm {...dummyProviderProps.translatorProps} user={dummyUser} />);
    const validate = enzymeWrapper.instance().validateForm;

    expect(validate(dummyFormProps)).toStrictEqual({});

    expect(validate({ ...dummyFormProps, name: '' })).toHaveProperty('name');
  });

});
