// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { push } from 'connected-react-router';

import { DummyProviders, dummyTopicData, dummyUserData, dummyProviderProps, dummyInitialState } from 'lib/testResources';
import { CorruptedInternalStateError } from 'errors';
import { TOPIC_EDITOR_ROUTE } from 'config/routes';
import makeRoute from 'lib/makeRoute';
import users from 'modules/users';
import topics from 'modules/topics';
import pullRequests from 'modules/pullRequests';

import NewPullRequestPage, { PureNewPullRequestPage } from '.';

describe(`NewPullRequestPage`, (): void => {

  let dummyTopic: topics.model.Topic;
  let dummyUpstreamTopic: topics.model.Topic;
  let dummyCurrentUser: users.model.User;
  let dummyMessage: string;
  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
    dummyUpstreamTopic = { ...dummyTopicData.upstream };
    dummyCurrentUser = { ...dummyUserData.user };
    dummyMessage = 'dummyMessage';

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
          byId: {
            [dummyCurrentUser.id]: dummyCurrentUser,
          },
        },
        topics: {
          byId: {
            [dummyTopic.id]: dummyTopic,
            [dummyUpstreamTopic.id]: dummyUpstreamTopic,
          },
        },
      },
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

  it(`renders an error message when the topic has no upstream`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyUpstreamTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <NewPullRequestPage
          {...fixedRouterProps}
          currentUserId={dummyCurrentUser.id}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="new-pull-request-card-no-upstream"]').hostNodes()).toHaveLength(1);
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

  it(`dispatches a pull requests CREATE action, and a PUSH action when the createPullRequest function passed to the NewPullRequestPage is called`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <NewPullRequestPage
          {...fixedRouterProps}
          currentUserId={dummyCurrentUser.id}
        />
      </DummyProviders>,
    );

    const onCreatePullRequest = enzymeWrapper.find('PureNewPullRequestPage').props().createPullRequest;
    onCreatePullRequest(dummyMessage, dummyTopic.id, dummyUpstreamTopic.id, dummyCurrentUser.id);

    expect(dummyDispatch).toHaveBeenCalledWith(pullRequests.actions.create(dummyMessage, dummyTopic.id, dummyUpstreamTopic.id, dummyCurrentUser.id));
    expect(dummyDispatch).toHaveBeenCalledWith(push(makeRoute(TOPIC_EDITOR_ROUTE, { topicId: dummyTopic.id })));
  });

});
