// @flow

import _ from 'lodash';
import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyProviderProps, dummyUserData } from 'lib/testResources';

import actions from '../../actions';
import * as m from '../../model';

import UserAccountMenu, { PureUserAccountMenu } from '.';

describe(`UserAccountMenu`, (): void => {

  let dummyUser: m.User;
  let dummyUsersById: m.UsersById;
  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyUser = { ...dummyUserData.user };
    dummyUsersById = { [dummyUser.id]: dummyUser };
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
      <PureUserAccountMenu
        {...dummyProviderProps.translatorProps}
        userId={dummyUser.id}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`fetches the user, when the user was not previously present in the state`, (): void => {
    _.unset(dummyUsersById, dummyUser.id);

    mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <UserAccountMenu userId={dummyUser.id} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(actions.fetch(dummyUser.id));
  });

  it(`renders the user, when the user was previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <UserAccountMenu userId={dummyUser.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="user-account-menu"]').hostNodes()).toHaveLength(1);
  });

});
