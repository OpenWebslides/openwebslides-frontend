// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyTopicData } from 'lib/testResources';

import actions from '../../actions';
import * as m from '../../model';

import Viewer, { PureViewer } from '.';

describe(`Viewer`, (): void => {

  let dummyTopic: m.Topic;
  let upstreamTopic: m.Topic;
  let downstreamTopic: m.Topic;
  let dummyTopicsById: m.TopicsById;
  let dummyState: any;
  let dummyDispatch: any;
  let dummyOnFork: any;

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
    dummyOnFork = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureViewer
        {...dummyProviderProps.translatorProps}
        topicId={dummyTopic.id}
        topic={dummyTopic}
        onFork={dummyOnFork}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`loads the topic, when the topic or its content was not previously present in the state`, (): void => {
    _.unset(dummyTopicsById, dummyTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(actions.fetchWithContent(dummyTopic.id));
    expect(enzymeWrapper.find('[data-test-id="topic-viewer"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the topic viewer, when the topic and its content were previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="topic-viewer"]').hostNodes()).toHaveLength(1);
  });

  it(`renders the topic fork button, when the topic does not have an upstream`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={upstreamTopic.id} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="topic-viewer-fork-button"]').hostNodes()).toHaveLength(1);
  });

  it(`does not render the topic fork button, when the topic has an upstream`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={downstreamTopic.id} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="topic-viewer-fork-button"]').hostNodes()).toHaveLength(0);
  });

  it(`dispatches a topic FORK action, when the fork button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={dummyTopic.id} />
      </DummyProviders>,
    );
    enzymeWrapper.find('[data-test-id="topic-viewer-fork-button"]').hostNodes().simulate('click');

    expect(dummyDispatch).toHaveBeenCalledWith(actions.fork(dummyTopic.id));
  });

});
