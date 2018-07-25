// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyUserData } from 'lib/testResources';

import actions from '../../actions';
import * as m from '../../model';

import UserAccountMenu, { PureUserAccountMenu } from '.';

describe(`UserAccountMenu`, (): void => {

  let dummyUser: m.User;

  beforeEach((): void => {
    dummyUser = { ...dummyUserData.user };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureUserAccountMenu
        {...dummyProviderProps.translatorProps}
        userId={dummyUser.id}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders the user, when the user was previously present in the state`, (): void => {
    const dummyUsersById: m.UsersById = {
      [dummyUser.id]: dummyUser,
    };
    const dummyState = { modules: { users: { byId: dummyUsersById } } };
    const dummyDispatch = jest.fn();

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <UserAccountMenu userId={dummyUser.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureUserAccountMenu').text()).toContain(dummyUser.name);
  });

  it(`fetches the user, when the user was not previously present in the state`, (): void => {
    const dummyUsersById: m.UsersById = {};
    const dummyState = { modules: { users: { byId: dummyUsersById } } };
    const dummyDispatch = jest.fn();

    mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <UserAccountMenu userId={dummyUser.id} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(actions.fetch(dummyUser.id));
  });

});
