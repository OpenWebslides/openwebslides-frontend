// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyTopicData, dummyContentItemData } from 'lib/testResources';
import platform from 'modules/platform';
import topics from 'modules/topics';

import SidebarsPageWrapper, { PureSidebarsPageWrapper } from '.';

describe(`SidebarsPageWrapper`, (): void => {

  let dummyTopic: topics.model.Topic;
  let dummyState: any;

  let dummyDispatch: *;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic, rootContentItemId: dummyContentItemData.rootContentItem.id };
    dummyState = {
      modules: {
        contentItems: {
          byId: {
            [dummyContentItemData.rootContentItem.id]: dummyContentItemData.rootContentItem,
          },
        },
        topics: {
          byId: {
            [dummyTopic.id]: dummyTopic,
          },
        },
        platform: {
          settings: {
            activeSidebarIds: [platform.model.sidebarIds.SLIDE_PREVIEWS, platform.model.sidebarIds.TOPIC_INFO],
          },
        },
      },
      flash: {
        messages: [],
      },
    };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSidebarsPageWrapper activeSidebarsCount={1} topicId="dummyTopicId">
        <h1>Lorem ipsum</h1>
        <p>Lorem ipsum dolor sit amet.</p>
      </PureSidebarsPageWrapper>,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`gets the correct activeSidebarsCount`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <SidebarsPageWrapper topicId={dummyTopic.id}>
          <p>Page content</p>
        </SidebarsPageWrapper>
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureSidebarsPageWrapper').props().activeSidebarsCount).toBe(2);
  });

});

