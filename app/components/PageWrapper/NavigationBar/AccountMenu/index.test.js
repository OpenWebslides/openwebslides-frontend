// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyUserData } from 'lib/testResources';
import users from 'modules/users';

import AccountMenu, { PureAccountMenu } from '.';

describe(`AccountMenu`, (): void => {

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
      <PureAccountMenu currentUserId={null} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders UserAccountMenu, when there is a current user`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <AccountMenu />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureUserAccountMenu')).toHaveLength(1);
    expect(enzymeWrapper.find('PureAuthMenu')).toHaveLength(0);
  });

  it(`renders AuthMenu, when there is no current user`, (): void => {
    dummyState.modules.platform.userAuth = null;

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <AccountMenu />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureUserAccountMenu')).toHaveLength(0);
    expect(enzymeWrapper.find('PureAuthMenu')).toHaveLength(1);
  });

});
