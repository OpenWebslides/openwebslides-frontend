// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { USER_PROFILE_ROUTE, USER_PROFILE_BY_ID_ROUTE } from 'config/routes';
import { UnsupportedOperationError } from 'errors';
import makeRoute from 'lib/makeRoute';
import { DummyProviders, dummyInitialState, dummyProviderProps, dummyUserData } from 'lib/testResources';
import users from 'modules/users';

import ProfilePage, { PureProfilePage } from '.';

describe(`ProfilePage`, (): void => {

  let dummyUser: users.model.User;

  beforeEach((): void => {
    dummyUser = { ...dummyUserData.user };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureProfilePage
        {...dummyProviderProps.routerProps}
        currentUserId="dummyUserId"
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the profile of the current user, when no userId route parameter is passed`, (): void => {
    const dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        platform: {
          ...dummyInitialState.modules.platform,
          userAuth: { userId: dummyUser.id, apiToken: 'foobarToken' },
        },
        users: {
          ...dummyInitialState.modules.users,
          byId: {
            [dummyUser.id]: dummyUser,
          },
        },
      },
    };

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyRouterEntries={[USER_PROFILE_ROUTE]}>
        <ProfilePage />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureUserProfile').props().userId).toBe(dummyUser.id);
  });

  it(`renders the profile for the user for the passed userId, when a userId route parameter is passed`, (): void => {
    const dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        users: {
          ...dummyInitialState.modules.users,
          byId: {
            [dummyUser.id]: dummyUser,
          },
        },
      },
    };

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyRouterEntries={[makeRoute(USER_PROFILE_BY_ID_ROUTE, { userId: dummyUser.id })]}>
        <ProfilePage />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureUserProfile').props().userId).toBe(dummyUser.id);
  });

  it(`throws an UnsupportedOperationError, when attempting to render the current user's profile while there is no current user`, (): void => {
    const dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        users: {
          ...dummyInitialState.modules.users,
          byId: {
            [dummyUser.id]: dummyUser,
          },
        },
      },
    };

    // Suppress console.error from mount $FlowFixMe
    console.error = jest.fn();
    expect((): void => {
      mount(
        <DummyProviders dummyState={dummyState} dummyRouterEntries={[USER_PROFILE_ROUTE]}>
          <ProfilePage />
        </DummyProviders>,
      );
    }).toThrow(UnsupportedOperationError);
  });

});
