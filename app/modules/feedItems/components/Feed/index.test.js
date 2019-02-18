// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyFeedItemData, dummyTopicData, dummyUserData } from 'lib/testResources';
import topics from 'modules/topics';
import users from 'modules/users';

import * as m from '../../model';

import Feed, { PureFeed } from '.';

describe(`Feed`, (): void => {

  let dummyTopic: topics.model.Topic;
  let dummyUser: users.model.User;
  let dummyFeedItem1: m.FeedItem;
  let dummyFeedItem2: m.FeedItem;
  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
    dummyUser = { ...dummyUserData.user };
    dummyFeedItem1 = { ...dummyFeedItemData.feedItem, timestamp: 1, topicId: dummyTopic.id, userId: dummyUser.id };
    dummyFeedItem2 = { ...dummyFeedItemData.feedItem2, timestamp: 2, topicId: dummyTopic.id, userId: dummyUser.id };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        feedItems: {
          ...dummyInitialState.modules.feedItems,
          byId: {
            [dummyFeedItem1.id]: dummyFeedItem1,
            [dummyFeedItem2.id]: dummyFeedItem2,
          },
        },
        topics: {
          ...dummyInitialState.modules.topics,
          byId: {
            [dummyTopic.id]: dummyTopic,
          },
        },
        users: {
          ...dummyInitialState.modules.users,
          byId: {
            [dummyUser.id]: dummyUser,
          },
        },
      },
    };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const dummyHandleFetchAll = jest.fn();
    const enzymeWrapper = shallow(
      <PureFeed
        sortedFeedItems={[]}
        handleFetchAll={dummyHandleFetchAll}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the feedItems from the state sorted by timestamp in reverse order`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Feed />
      </DummyProviders>,
    );
    const feedItemNodes = enzymeWrapper.find('PureFeedItem');

    expect(feedItemNodes).toHaveLength(2);
    expect(feedItemNodes.at(0).props().feedItem.id).toBe(dummyFeedItem2.id);
    expect(feedItemNodes.at(1).props().feedItem.id).toBe(dummyFeedItem1.id);
  });

});
