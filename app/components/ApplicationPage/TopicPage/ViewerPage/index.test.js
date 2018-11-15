// @flow

import _ from 'lodash';
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { push } from 'connected-react-router';

import { USER_PROFILE_ROUTE } from 'config/routes';
import { CorruptedInternalStateError } from 'errors';
import { DummyProviders, dummyInitialState, dummyUserData, dummyTopicData, dummyProviderProps } from 'lib/testResources';
import users from 'modules/users';
import topics from 'modules/topics';

import ViewerPage, { PureViewerPage } from '.';

describe(`ViewerPage`, (): void => {

  let dummyTopic: topics.model.Topic;
  let dummyCurrentUser: users.model.User;
  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
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
        topics: {
          ...dummyInitialState.modules.topics,
          byId: {
            [dummyTopic.id]: dummyTopic,
          },
        },
        contentItems: {
          byId: {},
        },
      },
    };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyTopic.id);

    const enzymeWrapper = shallow(
      <PureViewerPage
        {...fixedRouterProps}
        currentUserId={dummyCurrentUser.id}
        forkTopicToCurrentUser={jest.fn()}
      />,
    );

    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders with currentUserId NULL, when there is no current user`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyTopic.id);
    dummyState.modules.platform.userAuth = null;

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <ViewerPage {...fixedRouterProps} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find(`PureViewerPage`).props().currentUserId).toBeNull();
  });

  it(`renders NULL when match.params.id is NULL`, (): void => {
    const enzymeWrapper = shallow(
      <PureViewerPage
        {...dummyProviderProps.routerProps}
        currentUserId={dummyCurrentUser.id}
        forkTopicToCurrentUser={jest.fn()}
      />,
    );

    expect(enzymeWrapper.isEmptyRender()).toBe(true);
  });

  it(`dispatches a user FORK_TOPIC action for the current user and redirects to USER_PROFILE_ROUTE, when the onForkTopic function passed to Viewer is called`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <ViewerPage {...fixedRouterProps} />
      </DummyProviders>,
    );

    const onForkTopic = enzymeWrapper.find(`PureViewer`).props().onForkTopic;
    onForkTopic(dummyTopic.id);

    expect(dummyDispatch).toHaveBeenCalledWith(users.actions.forkTopic(dummyCurrentUser.id, dummyTopic.id));
    expect(dummyDispatch).toHaveBeenCalledWith(push(USER_PROFILE_ROUTE));
  });

  it(`throws a CorruptedInternalStateError when handleForkTopic is called while currentUserId is NULL`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyTopic.id);

    const enzymeWrapper = shallow(
      <PureViewerPage
        {...fixedRouterProps}
        currentUserId={null}
        forkTopicToCurrentUser={jest.fn()}
      />,
    );

    expect((): void => {
      enzymeWrapper.instance().handleForkTopic('dummyTopicId');
    }).toThrow(CorruptedInternalStateError);
  });

});
