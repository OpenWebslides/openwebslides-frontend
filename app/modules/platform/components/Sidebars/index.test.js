// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyTopicData, dummyContentItemData } from 'lib/testResources';
import topics from 'modules/topics';

import * as m from '../../model';

import Sidebars, { PureSidebars } from '.';

describe(`Sidebars`, (): void => {

  let dummyTopic: topics.model.Topic;
  let dummyState: any;
  let dummyDispatch: any;

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
            activeSidebarIds: [m.sidebarIds.SLIDE_PREVIEWS, m.sidebarIds.TOPIC_INFO],
          },
        },
      },
    };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSidebars
        activeSidebarIds={[]}
        topicId={dummyTopic.id}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders all active sidebars in reverse order`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Sidebars topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    const sidebarsGridItemNodes = enzymeWrapper.find('[data-test-id="sidebars-grid-item"]');

    expect(sidebarsGridItemNodes.at(0).find('PureTopicInfoSidebar')).toHaveLength(1);
    expect(sidebarsGridItemNodes.at(1).find('PureSlidePreviewsSidebar')).toHaveLength(1);
  });

  it(`fetches the topic for the passed id, when the topic was not previously present in the state`, (): void => {
    dummyState.modules.topics.byId = {};

    mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Sidebars topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(topics.actions.fetch(dummyTopic.id));
  });

});
