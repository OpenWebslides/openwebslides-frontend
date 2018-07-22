// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import i18nextConfig from 'config/i18next';
import { dummyTopicData, dummyContentItemData } from 'lib/testResources';
import topics from 'modules/topics';

import * as m from '../../model';

import Sidebars, { PureSidebars } from '.';

describe(`Sidebars`, (): void => {

  let dummyTopic: topics.model.Topic;
  let dummyState: any;

  let dummyDispatch: *;
  let dummyReducer: *;
  let dummyStore: *;

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
    dummyReducer = (state: any = {}, action: any): any => state;
    dummyStore = createStore(dummyReducer, dummyState);
    dummyStore.dispatch = dummyDispatch;
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSidebars
        activeSidebarIds={[]}
        topicId={dummyTopic.id}
        topic={dummyTopic}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders all active sidebars in reverse order`, (): void => {
    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <MemoryRouter>
            <Sidebars topicId={dummyTopic.id} />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>,
    );

    const sidebarsGridItemNodes = enzymeWrapper.find('[data-test-id="sidebars-grid-item"]');

    expect(sidebarsGridItemNodes.at(0).find('PureTopicInfoSidebar')).toHaveLength(1);
    expect(sidebarsGridItemNodes.at(1).find('PureSlidePreviewsSidebar')).toHaveLength(1);
  });

});
