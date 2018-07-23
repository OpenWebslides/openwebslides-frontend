// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import i18nextConfig from 'config/i18next';
import { dummyTopicData, dummyContentItemData } from 'lib/testResources';
import platform from 'modules/platform';
import topics from 'modules/topics';

import SidebarsPageWrapper, { PureSidebarsPageWrapper } from '.';

describe(`SidebarsPageWrapper`, (): void => {

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
            activeSidebarIds: [platform.model.sidebarIds.SLIDE_PREVIEWS, platform.model.sidebarIds.TOPIC_INFO],
          },
        },
      },
      flash: {
        messages: [],
      },
    };

    dummyDispatch = jest.fn();
    dummyReducer = (state: any = {}, action: any): any => state;
    dummyStore = createStore(dummyReducer, dummyState);
    dummyStore.dispatch = dummyDispatch;
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
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <MemoryRouter>
            <SidebarsPageWrapper topicId={dummyTopic.id}>
              <p>Page content</p>
            </SidebarsPageWrapper>
          </MemoryRouter>
        </I18nextProvider>
      </Provider>,
    );

    expect(enzymeWrapper.find('PureSidebarsPageWrapper').props().activeSidebarsCount).toBe(2);
  });

});

