// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyTopicData } from 'lib/testResources';
import topics from 'modules/topics';

import CoursePage, { PureCoursePage } from '.';

describe(`CoursePage`, (): void => {

  let dummyTopic: topics.model.Topic;
  let upstreamTopic: topics.model.Topic;
  let downstreamTopic: topics.model.Topic;
  let downstreamTopic2: topics.model.Topic;

  let dummyTopicsById: topics.model.TopicsById;
  let dummyState: any;
  let dummyDispatch: any;
  let dummyOnFork: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic, isContentFetched: true };
    upstreamTopic = dummyTopicData.upstream;
    downstreamTopic = dummyTopicData.downstream;
    downstreamTopic2 = dummyTopicData.downstream2;

    dummyTopicsById = {
      [dummyTopic.id]: dummyTopic,
      [upstreamTopic.id]: upstreamTopic,
      [downstreamTopic.id]: downstreamTopic2,
      [downstreamTopic2.id]: downstreamTopic2,
    };
    dummyState = { modules: {
      asyncRequests: { byId: {} },
      platform: { userAuth: null },
      contentItems: { byId: {} },
      topics: { byId: dummyTopicsById },
    } };
    dummyDispatch = jest.fn();
    dummyOnFork = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyTopic.id);

    const enzymeWrapper = shallow(
      <PureCoursePage {...fixedRouterProps} />,
    );

    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders NULL when match.params.id is NULL`, (): void => {
    const enzymeWrapper = shallow(
      <PureCoursePage {...dummyProviderProps.routerProps} />,
    );

    expect(enzymeWrapper.isEmptyRender()).toEqual(true);
  });

  it(`loads the topic, when the topic or its content was not previously present in the state`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyTopic.id);
    _.unset(dummyTopicsById, dummyTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <CoursePage {...fixedRouterProps} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(topics.actions.fetchWithContent(dummyTopic.id));
    expect(enzymeWrapper.find('[data-test-id="topic-course"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the topic editor, when the topic was previously present in the state`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <CoursePage {...fixedRouterProps} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="topic-course"]').hostNodes()).toHaveLength(1);
  });

  it(`renders the fork button when the topic does not have an upstream`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', upstreamTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <CoursePage {...fixedRouterProps} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="topic-course-fork-button"]').hostNodes()).toHaveLength(1);
  });

});
