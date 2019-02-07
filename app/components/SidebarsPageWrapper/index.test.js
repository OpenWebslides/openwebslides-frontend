// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyTopicData, dummyContentItemData } from 'lib/testResources';
import platform from 'modules/platform';
import topics from 'modules/topics';

import SidebarsPageWrapper, { PureSidebarsPageWrapper } from '.';

describe(`SidebarsPageWrapper`, (): void => {

  let dummyTopic: topics.model.Topic;
  let dummyState: any;

  let dummyDispatch: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic, rootContentItemId: dummyContentItemData.rootContentItem.id };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        contentItems: {
          ...dummyInitialState.modules.contentItems,
          byId: {
            [dummyContentItemData.rootContentItem.id]: dummyContentItemData.rootContentItem,
          },
        },
        topics: {
          ...dummyInitialState.modules.topics,
          byId: {
            [dummyTopic.id]: dummyTopic,
          },
        },
        platform: {
          ...dummyInitialState.modules.platform,
          settings: {
            ...dummyInitialState.modules.platform.settings,
            activeSidebarIds: [platform.model.sidebarIds.SLIDE_PREVIEWS, platform.model.sidebarIds.TOPIC_INFO],
          },
        },
      },
    };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSidebarsPageWrapper activeAndEnabledSidebarIds={[]} enabledSidebarIds={[]} topicId="dummyTopicId">
        <h1>Lorem ipsum</h1>
        <p>Lorem ipsum dolor sit amet.</p>
      </PureSidebarsPageWrapper>,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`gets the correct activeSidebarsCount`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <SidebarsPageWrapper
          topicId={dummyTopic.id}
          activeSidebarIds={[
            platform.model.sidebarIds.TOPIC_INFO,
            platform.model.sidebarIds.SLIDE_PREVIEWS,
          ]}
          enabledSidebarIds={[
            platform.model.sidebarIds.SLIDE_PREVIEWS,
            platform.model.sidebarIds.CONTRIBUTE,
          ]}
        >
          <p>Page content</p>
        </SidebarsPageWrapper>
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureSidebarsPageWrapper').props().activeAndEnabledSidebarIds).toStrictEqual([
      platform.model.sidebarIds.SLIDE_PREVIEWS,
    ]);
  });

});

