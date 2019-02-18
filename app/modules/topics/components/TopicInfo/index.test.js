// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { dummyTopicData } from 'lib/testResources';

import * as m from '../../model';

import { PureTopicInfo } from '.';

describe(`TopicInfo`, (): void => {

  let dummyTopic: m.Topic;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureTopicInfo topic={dummyTopic} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the topic's ForkInfo, when the topic's upstreamTopicId is not NULL`, (): void => {
    dummyTopic = { ...dummyTopic, upstreamTopicId: 'dummyUpstreamTopicId' };

    const enzymeWrapper = shallow(
      <PureTopicInfo topic={dummyTopic} />,
    );
    expect(enzymeWrapper.find('[data-test-id="topic-info-fork-info"]')).toHaveLength(1);
  });

  it(`does not render the topic's ForkInfo, when the topic's upstreamTopicId is NULL`, (): void => {
    const enzymeWrapper = shallow(
      <PureTopicInfo topic={dummyTopic} />,
    );
    expect(enzymeWrapper.find('[data-test-id="topic-info-fork-info"]')).toHaveLength(0);
  });

  it(`shows the description when the topic has a description`, (): void => {
    const enzymeWrapper = mount(
      <PureTopicInfo topic={dummyTopic} />,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-info-description"]').text()).toContain(dummyTopic.description);
  });

  it(`shows a placeholder when the topic has no description`, (): void => {
    const enzymeWrapper = mount(
      <PureTopicInfo topic={{ ...dummyTopic, description: null }} />,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-info-no-description"]').hostNodes()).toHaveLength(1);
  });

});
