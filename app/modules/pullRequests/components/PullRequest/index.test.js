// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyTopicData } from 'lib/testResources';
import topics from 'modules/topics';

import PullRequest, { PurePullRequest } from '.';

describe(`PullRequest`, (): void => {

  let dummyTopic: topics.model.Topic;
  let upstreamTopic: topics.model.Topic;
  let downstreamTopic: topics.model.Topic;
  let dummyTopicsById: topics.model.TopicsById;
  let dummyState: any;
  let dummyDispatch: any;
  let dummyOnSubmitPullRequest: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic, isContentFetched: true };
    upstreamTopic = { ...dummyTopicData.upstream, isContentFetched: true };
    downstreamTopic = { ...dummyTopicData.downstream, isContentFetched: true };
    dummyTopicsById = {
      [dummyTopic.id]: dummyTopic,
      [upstreamTopic.id]: upstreamTopic,
      [downstreamTopic.id]: downstreamTopic,
    };
    dummyState = { modules: {
      asyncRequests: { byId: {} },
      contentItems: { byId: {} },
      topics: { byId: dummyTopicsById },
    } };
    dummyDispatch = jest.fn();
    dummyOnSubmitPullRequest = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PurePullRequest
        {...dummyProviderProps.translatorProps}
        topicId={dummyTopic.id}
        topic={dummyTopic}
        onSubmitPullRequest={dummyOnSubmitPullRequest}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`loads the topic, when the topic or its content was not previously present in the state`, (): void => {
    _.unset(dummyTopicsById, dummyTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequest topicId={dummyTopic.id} onSubmitPullRequest={dummyOnSubmitPullRequest} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(topics.actions.fetchWithContent(dummyTopic.id));
    expect(enzymeWrapper.find('[data-test-id="topic-pullRequest"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the topic pull request, when the topic and its content were previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequest topicId={dummyTopic.id} onSubmitPullRequest={dummyOnSubmitPullRequest} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="topic-pull-request"]').hostNodes()).toHaveLength(1);
  });

  it(`calls the passed onSubmitPullRequest function, when the submit button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequest topicId={dummyTopic.id} onSubmitPullRequest={dummyOnSubmitPullRequest} />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="topic-pull-request-submit-button"]').hostNodes().simulate('click');
    expect(dummyOnSubmitPullRequest).toHaveBeenCalledWith(dummyTopic.id);
  });

});
