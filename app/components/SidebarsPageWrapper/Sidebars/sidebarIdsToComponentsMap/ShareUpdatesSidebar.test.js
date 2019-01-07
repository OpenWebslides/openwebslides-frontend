// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTopicData as dummyData, dummyProviderProps } from 'lib/testResources';
import topics from 'modules/topics';

import { PureShareUpdatesSidebar } from './ShareUpdatesSidebar';

describe(`ShareUpdatesSidebar`, (): void => {

  let dummyTopic: topics.model.Topic;

  beforeEach((): void => {
    dummyTopic = { ...dummyData.topic };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureShareUpdatesSidebar {...dummyProviderProps.translatorProps} topic={dummyTopic} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
