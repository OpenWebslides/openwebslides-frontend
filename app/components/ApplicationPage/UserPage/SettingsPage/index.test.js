// @flow

import _ from 'lodash';
import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { USER_SETTINGS_ROUTE } from 'config/routes';
import { UnsupportedOperationError } from 'errors';
import { DummyProviders, dummyInitialState, dummyProviderProps, dummyUserData } from 'lib/testResources';
import users from 'modules/users';

import SettingsPage, { PureSettingsPage } from '.';

describe(`SettingsPage`, (): void => {

  let dummyUser: users.model.User;
  let dummyState: any;

  beforeEach((): void => {
    dummyUser = { ...dummyUserData.user };
    dummyState = {
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
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSettingsPage
        {...dummyProviderProps.routerProps}
        currentUserId="dummyUserId"
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the settings of the current user`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyRouterEntries={[USER_SETTINGS_ROUTE]}>
        <SettingsPage />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureSettings').props().userId).toBe(dummyUser.id);
  });

  it(`throws an UnsupportedOperationError, when attempting to render the current user's settings while there is no current user`, (): void => {
    _.unset(dummyState, 'modules.platform.userAuth');

    // Suppress console.error from mount $FlowFixMe
    console.error = jest.fn();
    expect((): void => {
      mount(
        <DummyProviders dummyState={dummyState} dummyRouterEntries={[USER_SETTINGS_ROUTE]}>
          <SettingsPage />
        </DummyProviders>,
      );
    }).toThrow(UnsupportedOperationError);
  });

});
