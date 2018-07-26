// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyUserData } from 'lib/testResources';
import topics from 'modules/topics';

import actions from '../../actions';
import * as m from '../../model';

import UserProfile, { PureUserProfile } from '.';

describe(`UserProfile`, (): void => {

  let dummyUser: m.User;
  let dummyTopicsState: topics.model.TopicsState;

  beforeEach((): void => {
    dummyUser = { ...dummyUserData.user };
    dummyTopicsState = { byId: {} };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureUserProfile
        {...dummyProviderProps.translatorProps}
        userId={dummyUser.id}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`fetches the user's profile, when the user was not previously present in the state`, (): void => {
    const dummyUsersById: m.UsersById = {};
    const dummyState = { modules: {
      topics: dummyTopicsState,
      users: { byId: dummyUsersById },
    } };
    const dummyDispatch = jest.fn();

    mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <UserProfile userId={dummyUser.id} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(actions.fetch(dummyUser.id));
  });

  it(`renders the user's profile, when the user was previously present in the state`, (): void => {
    const dummyUsersById: m.UsersById = {
      [dummyUser.id]: dummyUser,
    };
    const dummyState = { modules: {
      topics: dummyTopicsState,
      users: { byId: dummyUsersById },
    } };
    const dummyDispatch = jest.fn();

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <UserProfile userId={dummyUser.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="user-profile-info"]').hostNodes()).toHaveLength(1);
  });

  it(`renders an 'edit profile' button, when isCurrentUser is set to TRUE`, (): void => {
    const dummyUsersById: m.UsersById = {
      [dummyUser.id]: dummyUser,
    };
    const dummyState = { modules: {
      topics: dummyTopicsState,
      users: { byId: dummyUsersById },
    } };
    const dummyDispatch = jest.fn();

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <UserProfile userId={dummyUser.id} isCurrentUser={true} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="user-profile-edit-button"]').hostNodes()).toHaveLength(1);
  });

  it(`does not render an 'edit profile' button, when isCurrentUser is set to TRUE`, (): void => {
    const dummyUsersById: m.UsersById = {
      [dummyUser.id]: dummyUser,
    };
    const dummyState = { modules: {
      topics: dummyTopicsState,
      users: { byId: dummyUsersById },
    } };
    const dummyDispatch = jest.fn();

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <UserProfile userId={dummyUser.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="user-profile-edit-button"]').hostNodes()).toHaveLength(0);
  });

});
