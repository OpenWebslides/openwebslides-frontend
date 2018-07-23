// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import i18nextConfig from 'config/i18next';
import { dummyUserData } from 'lib/testResources';
import users from 'modules/users';

import AccountMenu, { PureAccountMenu } from '.';

describe(`AccountMenu`, (): void => {

  let dummyUser: users.model.User;

  let dummyState: any;
  let dummyReducer: *;
  let dummyStore: *;

  beforeEach((): void => {
    dummyUser = { ...dummyUserData.user };
    dummyState = {
      modules: {
        platform: {
          userAuth: { userId: dummyUser.id, apiToken: 'foobarToken' },
        },
        users: {
          byId: {
            [dummyUser.id]: dummyUser,
          },
        },
      },
    };
    dummyReducer = (state: any = {}, action: any): any => state;
    dummyStore = createStore(dummyReducer, dummyState);
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureAccountMenu currentUserId={null} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders UserAccountMenu, when there is a current user`, (): void => {
    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <MemoryRouter>
            <AccountMenu />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>,
    );

    expect(enzymeWrapper.find('PureUserAccountMenu')).toHaveLength(1);
    expect(enzymeWrapper.find('PureAuthMenu')).toHaveLength(0);
  });

  it(`renders AuthMenu, when there is no current user`, (): void => {
    dummyState.modules.platform.userAuth = null;

    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <MemoryRouter>
            <AccountMenu />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>,
    );

    expect(enzymeWrapper.find('PureUserAccountMenu')).toHaveLength(0);
    expect(enzymeWrapper.find('PureAuthMenu')).toHaveLength(1);
  });

});
