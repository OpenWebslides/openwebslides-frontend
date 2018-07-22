// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps } from 'config/tests';
import { dummyTopicData } from 'lib/testResources';
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
        {...dummyTranslatorProps}
        topic={dummyTopic}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
