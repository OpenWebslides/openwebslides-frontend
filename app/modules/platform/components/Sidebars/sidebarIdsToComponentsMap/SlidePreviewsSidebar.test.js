// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTopicData, dummyProviderProps } from 'lib/testResources';
import topics from 'modules/topics';

import { PureSlidePreviewsSidebar } from './SlidePreviewsSidebar';

describe(`SlidePreviewsSidebar`, (): void => {

  let dummyTopic: topics.model.Topic;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSlidePreviewsSidebar
        {...dummyProviderProps.translatorProps}
        topic={dummyTopic}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
