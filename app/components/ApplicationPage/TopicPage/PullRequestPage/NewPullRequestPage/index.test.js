// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { push } from 'connected-react-router';

import { DummyProviders, dummyTopicData, dummyUserData, dummyProviderProps } from 'lib/testResources';
import { CorruptedInternalStateError } from 'errors';
import { TOPIC_EDITOR_ROUTE } from 'config/routes';
import makeRoute from 'lib/makeRoute';
import users from 'modules/users';
import topics from 'modules/topics';

import NewPullRequestPage, { PureNewPullRequestPage } from '.';

describe(`NewPullRequestPage`, (): void => {

  let dummyTopic: topics.model.Topic;
  let dummyCurrentUser: users.model.User;
  let dummyMessage: string;
  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
    dummyCurrentUser = { ...dummyUserData.user };
    dummyMessage = 'dummyMessage';

    dummyState = {
      modules: {
        asyncRequests: { byId: {} },
        platform: {
          userAuth: {
            userId: dummyCurrentUser.id,
            apiToken: 'foobarToken',
          },
        },
        users: {
          byId: {
            [dummyCurrentUser.id]: dummyCurrentUser,
          },
        },
        topics: {
          byId: {
            [dummyTopic.id]: dummyTopic,
          },
        },
      },
      flash: { messages: [] },
    };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyTopic.id);

    const enzymeWrapper = shallow(
      <PureNewPullRequestPage
        {...fixedRouterProps}
      />,
    );

    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`does not render with currentUserId NULL, when there is no current user`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyTopic.id);
    dummyState.modules.platform.userAuth = null;

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <NewPullRequestPage {...fixedRouterProps} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find(`PureNewPullRequestPage`).props().currentUserId).toBeNull();
  });

  it(`renders NULL when match.params.id is NULL`, (): void => {
    const enzymeWrapper = shallow(
      <PureNewPullRequestPage {...dummyProviderProps.routerProps} />,
    );

    expect(enzymeWrapper.isEmptyRender()).toBe(true);
  });

  it(`throws a CorruptedInternalStateError when handleSubmitPullRequest is called while currentUserId is NULL`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyTopic.id);

    const enzymeWrapper = shallow(
      <PureNewPullRequestPage
        {...fixedRouterProps}
        currentUserId={null}
      />,
    );

    expect((): void => {
      enzymeWrapper.instance().handleCreatePullRequest('dummyTopicId');
    }).toThrow(CorruptedInternalStateError);
  });

  it(`dispatches a PUSH action when the onCreatePullRequest function passed to the NewPullRequestCard is called`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <NewPullRequestPage
          {...fixedRouterProps}
          currentUserId={dummyCurrentUser.id}
        />
      </DummyProviders>,
    );

    const onCreatePullRequest = enzymeWrapper.find('PureNewPullRequestCard').props().onCreatePullRequest;
    onCreatePullRequest(dummyTopic.id, dummyMessage);

    expect(dummyDispatch).toHaveBeenCalledWith(push(makeRoute(TOPIC_EDITOR_ROUTE, { topicId: dummyTopic.id })));
  });

});
