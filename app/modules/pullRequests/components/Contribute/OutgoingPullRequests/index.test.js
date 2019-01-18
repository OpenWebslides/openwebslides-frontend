// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyTopicData, dummyInitialState } from 'lib/testResources';
import topics from 'modules/topics';

import OutgoingPullRequests, { PureOutgoingPullRequests } from '.';

describe(`OutgoingPullRequests`, (): void => {

  let dummyTopic: topics.model.Topic;
  let dummyDirtyTopic: topics.model.Topic;
  let dummyUpstreamTopic: topics.model.Topic;
  let dummyDownstreamTopic: topics.model.Topic;
  let dummyTopicsById: topics.model.TopicsById;
  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
    dummyDirtyTopic = { ...dummyTopicData.downstream, id: 'dummyDirtyTopic', isContentFetched: true, isDirty: true };
    dummyUpstreamTopic = { ...dummyTopicData.upstream, isContentFetched: true };
    dummyDownstreamTopic = { ...dummyTopicData.downstream, isContentFetched: true };
    dummyTopicsById = {
      [dummyTopic.id]: dummyTopic,
      [dummyDirtyTopic.id]: dummyDirtyTopic,
      [dummyUpstreamTopic.id]: dummyUpstreamTopic,
      [dummyDownstreamTopic.id]: dummyDownstreamTopic,
    };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        topics: {
          ...dummyInitialState.modules.topics,
          byId: dummyTopicsById,
        },
      },
    };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureOutgoingPullRequests
        {...dummyProviderProps.translatorProps}
        topic={dummyTopic}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`loads the upstream topic, when the upstream topic was not previously present in the state`, (): void => {
    _.unset(dummyTopicsById, dummyUpstreamTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <OutgoingPullRequests topic={dummyDownstreamTopic} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(topics.actions.fetch(dummyUpstreamTopic.id));
    expect(enzymeWrapper.find('[data-test-id="send-updates"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the outgoing pull requests component, when the upstream topic was previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <OutgoingPullRequests topic={dummyDownstreamTopic} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="outgoing-pull-requests"]').hostNodes()).toHaveLength(1);
  });

  it(`renders the empty message when the topic has no outgoing pull requests`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <OutgoingPullRequests topic={{ ...dummyDownstreamTopic, outgoingPullRequestIds: [] }} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="outgoing-pull-requests-empty-message"]').hostNodes()).toHaveLength(1);
  });

  it(`renders a PullRequest component and no empty message for every outgoing pull request in the topic`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <OutgoingPullRequests topic={{ ...dummyDownstreamTopic, outgoingPullRequestIds: ['foo', 'bar'] }} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="outgoing-pull-requests-empty-message"]').hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find('PurePullRequestEntry')).toHaveLength(2);
  });

});
