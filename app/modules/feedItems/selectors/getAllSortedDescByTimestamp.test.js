// @flow

import { dummyFeedItemData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`getAllSortedDescByTimestamp`, (): void => {

  let dummyFeedItem1: m.FeedItem;
  let dummyFeedItem2: m.FeedItem;
  let dummyFeedItem3: m.FeedItem;
  let dummyFeedItemsById: m.FeedItemsById;
  let dummyFeedItemsState: m.FeedItemsState;
  let dummyState: any;
  let dummyEmptyState: any;

  beforeEach((): void => {
    dummyFeedItem1 = { ...dummyFeedItemData.feedItem, timestamp: 1 };
    dummyFeedItem2 = { ...dummyFeedItemData.feedItem2, timestamp: 2 };
    dummyFeedItem3 = { ...dummyFeedItemData.feedItem3, timestamp: 3 };
    dummyFeedItemsById = {
      [dummyFeedItem2.id]: dummyFeedItem2,
      [dummyFeedItem1.id]: dummyFeedItem1,
      [dummyFeedItem3.id]: dummyFeedItem3,
    };
    dummyFeedItemsState = { byId: dummyFeedItemsById };
    dummyState = { modules: { feedItems: dummyFeedItemsState } };
    dummyEmptyState = { modules: { feedItems: { byId: {} } } };
  });

  it(`returns an array containing all feedItems sorted by timestamp in descending order, when there are one or more feedItems in the state`, (): void => {
    const feedItems = selectors.getAllSortedDescByTimestamp(dummyState);
    expect(feedItems).toEqual([dummyFeedItem3, dummyFeedItem2, dummyFeedItem1]);
  });

  it(`returns an empty array, when there are no feedItems in the state`, (): void => {
    const feedItems = selectors.getAllSortedDescByTimestamp(dummyEmptyState);
    expect(feedItems).toEqual([]);
  });

});
