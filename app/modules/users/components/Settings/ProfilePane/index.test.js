// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyUserData } from 'lib/testResources';

import actions from '../../../actions';
import * as m from '../../../model';

import ProfilePane, { PureProfilePane } from '.';

describe(`ProfilePane`, (): void => {

  let dummyUser: m.User;
  let dummyDispatch: any;
  let dummyName: string;
  let dummyLocale: string;
  let dummyAlertEmails: boolean;
  let dummyAge: number;
  let dummyGender: m.GenderType;
  let dummyRole: m.RoleType;
  let dummyCountry: m.CountryType;

  beforeEach((): void => {
    dummyUser = { ...dummyUserData.user };
    dummyDispatch = jest.fn();
    dummyName = 'dummyName';
    dummyLocale = 'dummyLocale';
    dummyAlertEmails = false;
    dummyAge = 18;
    dummyGender = m.genderTypes.MALE;
    dummyRole = m.roleTypes.LEARNER;
    dummyCountry = m.countryTypes.BELGIUM;
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureProfilePane
        {...dummyProviderProps.translatorProps}
        user={dummyUser}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders a profile form`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <ProfilePane user={dummyUser} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureProfileForm')).toHaveLength(1);
  });

  it(`dispatches a users UPDATE action, when the onUpdateUser function passed to ProfileForm is called`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <ProfilePane user={dummyUser} />
      </DummyProviders>,
    );
    const onSubmit = enzymeWrapper.find('PureProfileForm').props().onSubmit;
    onSubmit({
      name: dummyName,
      locale: dummyLocale,
      alertEmails: dummyAlertEmails,
      age: dummyAge,
      gender: dummyGender,
      role: dummyRole,
      country: dummyCountry,
    });

    expect(dummyDispatch).toHaveBeenCalledWith(actions.update(dummyUser.id, dummyName, dummyLocale, dummyAlertEmails, dummyAge, dummyGender, dummyRole, dummyCountry));
  });

});
