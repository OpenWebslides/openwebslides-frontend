// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTopicData as dummyData } from 'lib/testResources';
import topics from 'modules/topics';

import { PureTopicInfoSidebar } from './TopicInfoSidebar';

describe(`TopicInfoSidebar`, (): void => {

  let dummyTopic: topics.model.Topic;

  beforeEach((): void => {
    dummyTopic = { ...dummyData.topic };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureTopicInfoSidebar topic={dummyTopic} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
