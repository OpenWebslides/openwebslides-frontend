// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps } from 'config/tests';
import { dummyTopicData, dummyContentItemData } from 'lib/testResources';
import topics from 'modules/topics';
import contentItems from 'modules/contentItems';

import { PureSlidePreviewsSidebar } from './SlidePreviewsSidebar';

describe(`SlidePreviewsSidebar`, (): void => {

  let dummyTopic: topics.model.Topic;
  let dummyContentItemTreeRootItem: contentItems.model.DenormalizedRootContentItem;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
    dummyContentItemTreeRootItem = {
      ...dummyContentItemData.rootContentItem,
      childItems: [],
    };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSlidePreviewsSidebar
        {...dummyTranslatorProps}
        topic={dummyTopic}
        contentItemTreeRootItem={dummyContentItemTreeRootItem}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
