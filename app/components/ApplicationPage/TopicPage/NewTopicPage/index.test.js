// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { push } from 'connected-react-router';

import { USER_PROFILE_ROUTE } from 'config/routes';
import { CorruptedInternalStateError } from 'errors';
import { DummyProviders, dummyInitialState, dummyUserData } from 'lib/testResources';
import users from 'modules/users';

import NewTopicPage, { PureNewTopicPage } from '.';

describe(`NewTopicPage`, (): void => {

  let dummyCurrentUser: users.model.User;
  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyCurrentUser = { ...dummyUserData.user };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        platform: {
          ...dummyInitialState.modules.platform,
          userAuth: {
            userId: dummyCurrentUser.id,
            apiToken: 'foobarToken',
          },
        },
        users: {
          ...dummyInitialState.modules.users,
          byId: {
            [dummyCurrentUser.id]: dummyCurrentUser,
          },
        },
      },
    };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureNewTopicPage currentUserId="dummyUserId" addTopicToCurrentUser={jest.fn()} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders with currentUserId NULL, when there is no current user`, (): void => {
    dummyState.modules.platform.userAuth = null;

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <NewTopicPage />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find(`PureNewTopicPage`).props().currentUserId).toBeNull();
  });

  it(`dispatches a user ADD_TOPIC action for the current user and redirects to USER_PROFILE_ROUTE, when the onAddTopic function passed to NewTopicCard is called`, (): void => {
    const dummyTopicId = 'dummyTopicId';
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <NewTopicPage />
      </DummyProviders>,
    );

    const onAddTopic = enzymeWrapper.find(`PureNewTopicCard`).props().onAddTopic;
    onAddTopic(dummyTopicId);

    expect(dummyDispatch).toHaveBeenCalledWith(users.actions.addTopic(dummyCurrentUser.id, dummyTopicId));
    expect(dummyDispatch).toHaveBeenCalledWith(push(USER_PROFILE_ROUTE));
  });

  it(`throws a CorruptedInternalStateError when handleAddTopic is called while currentUserId is NULL`, (): void => {
    const enzymeWrapper = shallow(
      <PureNewTopicPage currentUserId={null} addTopicToCurrentUser={jest.fn()} />,
    );

    expect((): void => {
      enzymeWrapper.instance().handleAddTopic('title', 'description');
    }).toThrow(CorruptedInternalStateError);
  });

});
