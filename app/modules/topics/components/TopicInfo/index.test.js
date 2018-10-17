// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps, dummyTopicData } from 'lib/testResources';

import * as m from '../../model';

import { PureTopicInfo } from '.';

describe(`TopicInfo`, (): void => {

  let dummyTopic: m.Topic;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureTopicInfo
        {...dummyProviderProps.translatorProps}
        topic={dummyTopic}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the topic's ForkInfo, when the topic's upstreamTopicId is not NULL`, (): void => {
    dummyTopic = { ...dummyTopic, upstreamTopicId: 'dummyUpstreamTopicId' };

    const enzymeWrapper = shallow(
      <PureTopicInfo
        {...dummyProviderProps.translatorProps}
        topic={dummyTopic}
      />,
    );
    expect(enzymeWrapper.find('[data-test-id="topic-info-fork-info"]')).toHaveLength(1);
  });

  it(`does not render the topic's ForkInfo, when the topic's upstreamTopicId is NULL`, (): void => {
    const enzymeWrapper = shallow(
      <PureTopicInfo
        {...dummyProviderProps.translatorProps}
        topic={dummyTopic}
      />,
    );
    expect(enzymeWrapper.find('[data-test-id="topic-info-fork-info"]')).toHaveLength(0);
  });

  it(`renders an empty description message, when the passed topic doesn't have a description`, (): void => {
    const dummyNoDescString = 'test.no.description.found';
    const fixedDummyTranslatorProps = {
      ...dummyProviderProps.translatorProps,
      t: (key: ?string): string => {
        if (key === 'topics:props.noDescription') return dummyNoDescString;
        else return (key != null) ? key : 'string';
      },
    };
    const fixedDummyTopic = { ...dummyTopic, description: null };

    const enzymeWrapper = shallow(
      <PureTopicInfo
        {...fixedDummyTranslatorProps}
        topic={fixedDummyTopic}
      />,
    );
    const descriptionNode = enzymeWrapper.find('[data-test-id="topic-info-description"]');

    expect(descriptionNode.props().children).toContain(dummyNoDescString);
  });

});
