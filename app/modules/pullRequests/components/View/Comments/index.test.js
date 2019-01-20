// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyProviderProps, dummyPullRequestData, dummyTopicData, dummyUserData } from 'lib/testResources';
import topics from 'modules/topics';
import users from 'modules/users';

import * as m from '../../../model';

import Comments, { PureComments } from '.';

describe(`Comments`, (): void => {

  let dummyTarget: topics.model.Topic;
  let dummyTarget2: topics.model.Topic;
  let dummySource: topics.model.Topic;
  let dummyUser: users.model.User;
  let dummyPullRequest: m.PullRequest;
  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyTarget = { ...dummyTopicData.upstream };
    dummyTarget2 = { ...dummyTopicData.upstream, userId: 'someUserId', collaboratorUserIds: [] };
    dummySource = { ...dummyTopicData.downstream, upstreamTopicId: dummyTarget.id };
    dummyUser = { ...dummyUserData.user };
    dummyPullRequest = { ...dummyPullRequestData.pullRequest, sourceTopicId: dummySource.id, targetTopicId: dummyTarget.id, userId: dummyUser.id };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        topics: {
          ...dummyInitialState.modules.topics,
          byId: {
            [dummyTarget.id]: dummyTarget,
            [dummySource.id]: dummySource,
          },
        },
        pullRequests: {
          ...dummyInitialState.modules.pullRequests,
          byId: {
            [dummyPullRequest.id]: dummyPullRequest,
          },
        },
        users: {
          ...dummyInitialState.modules.users,
          byId: {
            [dummyUser.id]: dummyUser,
          },
        },
        platform: {
          ...dummyInitialState.modules.platform,
          userAuth: { userId: dummyUser.id, apiToken: 'foobarToken' },
        },
      },
    };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureComments
        {...dummyProviderProps.translatorProps}
        pullRequest={dummyPullRequest}
        source={dummySource}
        target={dummyTarget}
        fetchTopic={jest.fn()}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`fetches the source and target topics, when the topics were not previously present in the state`, (): void => {
    dummyState.modules.topics.byId = {};

    mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Comments pullRequest={dummyPullRequest} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(topics.actions.fetch(dummyPullRequest.sourceTopicId));
    expect(dummyDispatch).toHaveBeenCalledWith(topics.actions.fetch(dummyPullRequest.targetTopicId));
  });

  it(`renders comments, when the topics were previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Comments pullRequest={dummyPullRequest} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="comments"]')).toHaveLength(1);
  });

  it(`renders the pull request message`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Comments pullRequest={dummyPullRequest} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="comments-message"]').text()).toContain(dummyPullRequest.message);
  });

  it(`renders the review buttons when the topic is ready`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Comments pullRequest={{ ...dummyPullRequest, state: m.pullRequestStates.READY }} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="comments-review-buttons"]').hostNodes()).toHaveLength(1);
  });

  it(`does not render the review buttons when the topic is not ready`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Comments pullRequest={{ ...dummyPullRequest, state: m.pullRequestStates.ACCEPTED }} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="comments-review-buttons"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the review buttons when the current user can review the pull request`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Comments pullRequest={{ ...dummyPullRequest, state: m.pullRequestStates.READY }} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="comments-review-buttons"]').hostNodes()).toHaveLength(1);
  });

  it(`does not render the review buttons when the current user cannot review the pull request`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Comments pullRequest={{ ...dummyPullRequest, state: m.pullRequestStates.READY, targetTopicId: dummyTarget2 }} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="comments-review-buttons"]').hostNodes()).toHaveLength(0);
  });

});
