// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import topics from 'modules/topics';
import contentItems from 'modules/contentItems';

import { PureSlidePreviewsSidebar } from './SlidePreviewsSidebar';

describe(`SlidePreviewsSidebar`, (): void => {

  let dummyTopic: topics.model.Topic;
  let dummyContentItemTreeRootItem: contentItems.model.DenormalizedRootContentItem;

  beforeEach((): void => {
    dummyTopic = {
      id: 'dummyTopicId',
      title: 'Lorem ipum',
      description: 'Bla',
      rootContentItemId: 'dummyContentItemId',
      userId: 'dummyUserId',
    };
    dummyContentItemTreeRootItem = {
      id: 'dummyContentItemId',
      type: contentItems.model.contentItemTypes.ROOT,
      isEditing: false,
      childItems: [],
    };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSlidePreviewsSidebar
        topic={dummyTopic}
        contentItemTreeRootItem={dummyContentItemTreeRootItem}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
