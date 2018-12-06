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

    expect(enzymeWrapper.find('[data-test-id="user-settings-info"]').hostNodes()).toHaveLength(1);
  });

  it(`renders the email, when the users's email is present in the user`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Settings userId={dummyUser.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="user-settings-email"]').hostNodes()).toHaveLength(1);
  });

  it(`renders the active tab contents`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Settings userId={dummyUser.id} />
      </DummyProviders>,
    );

    // Tab contents are only rendered when the tab is active
    enzymeWrapper.find('Tab MenuItem[index=0]').simulate('click');
    expect(enzymeWrapper.find('PureProfilePane')).toHaveLength(1);
    expect(enzymeWrapper.find('PureAccountPane')).toHaveLength(0);

    enzymeWrapper.find('Tab MenuItem[index=1]').simulate('click');
    expect(enzymeWrapper.find('PureProfilePane')).toHaveLength(0);
    expect(enzymeWrapper.find('PureAccountPane')).toHaveLength(1);
  });

});
