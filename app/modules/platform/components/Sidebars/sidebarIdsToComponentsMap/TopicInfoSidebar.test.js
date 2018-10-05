// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTopicData as dummyData, dummyProviderProps } from 'lib/testResources';
import topics from 'modules/topics';

import { PureTopicInfoSidebar } from './TopicInfoSidebar';

describe(`TopicInfoSidebar`, (): void => {

  let dummyTopic: topics.model.Topic;
  let upstreamTopic: topics.model.Topic;
  let downstreamTopic: topics.model.Topic;

  beforeEach((): void => {
    dummyTopic = { ...dummyData.topic };
    upstreamTopic = { ...dummyData.upstream };
    downstreamTopic = { ...dummyData.downstream };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureTopicInfoSidebar {...dummyProviderProps.translatorProps} topic={dummyTopic} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders an empty description message, when the passed topic doesn't have a description`, (): void => {
    const dummyNoDescString = 'test.no.description.found';
    const fixedDummyTranslatorProps = {
      ...dummyProviderProps.translatorProps,
      t: (key: ?string): string => {
        if (key === 'topics:noDescription') return dummyNoDescString;
        else return (key != null) ? key : 'string';
      },
    };
    const fixedDummyTopic = { ...dummyTopic, description: null };

    const enzymeWrapper = shallow(
      <PureTopicInfoSidebar {...fixedDummyTranslatorProps} topic={fixedDummyTopic} />,
    );
    const descriptionNode = enzymeWrapper.find('[data-test-id="topic-info-sidebar-topic-description"]');

    expect(descriptionNode.props().children).toContain(dummyNoDescString);
  });

  it(`renders the upstream topic link when topic has an upstream`, (): void => {
    const enzymeWrapper = shallow(
      <PureTopicInfoSidebar
        topic={downstreamTopic}
        {...dummyProviderProps.translatorProps}
      />,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-info-sidebar-fork-info"]')).toHaveLength(1);
  });

  it(`does not render the upstream topic link when topic does not have an upstream`, (): void => {
    const enzymeWrapper = shallow(
      <PureTopicInfoSidebar
        topic={upstreamTopic}
        {...dummyProviderProps.translatorProps}
      />,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-info-sidebar-fork-info"]')).toHaveLength(0);
  });

});
