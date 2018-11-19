// @flow

import _ from 'lodash';
import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyTopicData, dummyInitialState } from 'lib/testResources';
import topics from 'modules/topics';

import NewPullRequestCard, { PureNewPullRequestCard } from '.';

describe(`NewPullRequestCard`, (): void => {

  let dummyMessage: string;
  let dummyDownstreamTopic: topics.model.Topic;
  let dummyUpstreamTopic: topics.model.Topic;
  let dummyTopicsById: topics.model.TopicsById;
  let dummyState: any;
  let dummyDispatch: any;
  let dummyOnCreatePullRequest: any;

  beforeEach((): void => {
    dummyMessage = 'dummyMessage';
    dummyDownstreamTopic = { ...dummyTopicData.topic, id: 'dummyDownstreamTopic', upstreamTopicId: 'dummyUpstreamTopic' };
    dummyUpstreamTopic = { ...dummyTopicData.topic2, id: 'dummyUpstreamTopic' };
    dummyTopicsById = {
      [dummyDownstreamTopic.id]: dummyDownstreamTopic,
      [dummyUpstreamTopic.id]: dummyUpstreamTopic,
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
    dummyOnCreatePullRequest = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureNewPullRequestCard
        {...dummyProviderProps.translatorProps}
        onCreatePullRequest={dummyOnCreatePullRequest}
        sourceTopic={dummyDownstreamTopic}
        targetTopic={dummyUpstreamTopic}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`loads the topic, when the topic or its content was not previously present in the state`, (): void => {
    _.unset(dummyTopicsById, dummyDownstreamTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <NewPullRequestCard
          sourceTopicId={dummyDownstreamTopic.id}
          targetTopicId={dummyUpstreamTopic.id}
          onCreatePullRequest={dummyOnCreatePullRequest}
        />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(topics.actions.fetch(dummyDownstreamTopic.id));
    expect(enzymeWrapper.find('[data-test-id="new-pull-request-card"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the topic editor, when the topic and its content were previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <NewPullRequestCard
          sourceTopicId={dummyDownstreamTopic.id}
          targetTopicId={dummyUpstreamTopic.id}
          onCreatePullRequest={dummyOnCreatePullRequest}
        />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="new-pull-request-card"]').hostNodes()).toHaveLength(1);
  });

  it(`calls the passed onCreatePullRequest function, when its form is submitted`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <NewPullRequestCard
          sourceTopicId={dummyDownstreamTopic.id}
          targetTopicId={dummyUpstreamTopic.id}
          onCreatePullRequest={dummyOnCreatePullRequest}
        />
      </DummyProviders>,
    );
    const onSubmit = enzymeWrapper.find('[data-test-id="new-pull-request-card-form"]').at(0).props().onSubmit;

    onSubmit({ message: dummyMessage });
    expect(dummyOnCreatePullRequest).toHaveBeenCalledWith(dummyMessage, dummyDownstreamTopic.id, dummyUpstreamTopic.id);
  });

});
