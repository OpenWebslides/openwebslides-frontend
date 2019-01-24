// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyPullRequestData, dummyTopicData, dummyUserData, dummyInitialState } from 'lib/testResources';
import topics from 'modules/topics';
import users from 'modules/users';

import actions from '../../actions';
import * as m from '../../model';

import View, { PureView } from '.';

describe(`View`, (): void => {

  let dummyPullRequest: m.PullRequest;
  let dummyPullRequestsById: m.PullRequestsById;
  let dummyTopic: topics.model.Topic;
  let dummyUser: users.model.User;
  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyPullRequest = dummyPullRequestData.pullRequest;
    dummyPullRequestsById = {
      [dummyPullRequest.id]: dummyPullRequest,
    };
    dummyTopic = dummyTopicData.topic;
    dummyUser = dummyUserData.user;
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        pullRequests: {
          ...dummyInitialState.modules.pullRequests,
          byId: dummyPullRequestsById,
        },
        topics: {
          ...dummyInitialState.modules.topics,
          byId: {
            [dummyPullRequest.sourceTopicId]: dummyTopic,
            [dummyPullRequest.targetTopicId]: dummyTopic,
          },
        },
        users: {
          ...dummyInitialState.modules.users,
          byId: {
            [dummyPullRequest.userId]: dummyUser,
          },
        },
      },
    };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureView
        {...dummyProviderProps.translatorProps}
        pullRequestId={dummyPullRequest.id}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`loads the pull request, when the pull request was not previously present in the state`, (): void => {
    _.unset(dummyPullRequestsById, dummyPullRequest.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <View pullRequestId={dummyPullRequest.id} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(actions.fetch(dummyPullRequest.id));
    expect(enzymeWrapper.find('[data-test-id="pull-request-view"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the pull request view, when the pull request was previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <View pullRequestId={dummyPullRequest.id} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="pull-request-view"]').hostNodes()).toHaveLength(1);
  });

  it(`renders the pull request message`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <View pullRequestId={dummyPullRequest.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="pull-request-view-message"]').hostNodes().html()).toContain(dummyPullRequest.message);
  });

  it(`renders comments`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <View pullRequestId={dummyPullRequest.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureComments')).toHaveLength(1);
  });

});
