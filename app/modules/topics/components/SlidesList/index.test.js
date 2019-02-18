// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import contentItemSplit from 'lib/contentItemSplit';
import { DummyProviders, dummyInitialState, dummyTopicData, dummyContentItemData } from 'lib/testResources';
import contentItems from 'modules/contentItems';

import * as m from '../../model';

import SlidesList, { PureSlidesList } from '.';

describe(`SlidesList`, (): void => {

  let dummyHeading2: contentItems.model.HeadingContentItem;
  let dummyHeading1: contentItems.model.HeadingContentItem;
  let dummyRoot: contentItems.model.RootContentItem;
  let dummyTopic: m.Topic;
  let dummyState: any;
  let dummyEmptyState: any;
  let dummyRootContentItems: $ReadOnlyArray<contentItems.model.DenormalizedContentItem>;

  beforeEach((): void => {
    dummyHeading2 = { ...dummyContentItemData.headingContentItem2 };
    dummyHeading1 = { ...dummyContentItemData.headingContentItem };
    dummyRoot = { ...dummyContentItemData.rootContentItem, childItemIds: [dummyHeading1.id, dummyHeading2.id] };
    dummyTopic = { ...dummyTopicData.topic, rootContentItemId: dummyRoot.id };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        topics: {
          ...dummyInitialState.modules.topics,
          byId: { [dummyTopic.id]: dummyTopic },
        },
        contentItems: {
          ...dummyInitialState.modules.contentItems,
          byId: {
            [dummyRoot.id]: dummyRoot,
            [dummyHeading1.id]: dummyHeading1,
            [dummyHeading2.id]: dummyHeading2,
          },
        },
      },
    };
    dummyEmptyState = { modules: { topics: { byId: {} }, contentItems: { byId: {} } } };
    dummyRootContentItems = contentItemSplit(contentItems.selectors.getDenormalizedById(dummyState, { id: dummyTopic.rootContentItemId }));
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSlidesList
        topicId="dummyTopicId"
        rootContentItems={[]}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders a slide for each of the rootContentItems returned by the contentItemSplit function`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <SlidesList topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    enzymeWrapper.find('PureSlide').forEach((pureSlide: any, index: number): void => {
      expect(pureSlide.props().contentItem).toStrictEqual(dummyRootContentItems[index]);
    });
  });

  it(`renders NULL, when the topic for the passed id could not be found`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyEmptyState}>
        <SlidesList topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureSlidesList').isEmptyRender()).toBe(true);
  });

});
