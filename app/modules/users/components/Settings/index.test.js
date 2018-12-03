// @flow

import _ from 'lodash';
import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyProviderProps, dummyUserData } from 'lib/testResources';

import actions from '../../actions';
import * as m from '../../model';

import Settings, { PureSettings } from '.';

describe(`Settings`, (): void => {

  let dummyUser: m.User;
  let dummyUsersById: m.UsersById;
  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyUser = { ...dummyUserData.user };
    dummyUsersById = {
      [dummyUser.id]: dummyUser,
    };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        users: {
          ...dummyInitialState.modules.users,
          byId: dummyUsersById,
        },
      },
    };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSettings
        {...dummyProviderProps.translatorProps}
        userId={dummyUser.id}
        removeTopicFromUser={jest.fn()}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`fetches the user's settings, when the user was not previously present in the state`, (): void => {
    _.unset(dummyUsersById, dummyUser.id);

    mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Settings userId={dummyUser.id} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(actions.fetch(dummyUser.id));
  });

  it(`renders the user's settings, when the user was previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Settings userId={dummyUser.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="user-profile-info"]').hostNodes()).toHaveLength(1);
  });

  it(`renders the email, when the users's email is present in the user`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Settings userId={dummyUser.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="user-profile-email"]').hostNodes()).toHaveLength(1);
  });

  it(`does not render the email, when user's email is not present in the user`, (): void => {
    _.unset(dummyUser, 'email');

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Settings userId={dummyUser.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="user-profile-edit-button"]').hostNodes()).toHaveLength(0);
  });

});
