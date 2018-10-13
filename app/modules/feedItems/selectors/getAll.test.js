// @flow

import { dummyFeedItemData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`getAll`, (): void => {

  let dummyFeedItem1: m.FeedItem;
  let dummyFeedItem2: m.FeedItem;
  let dummyFeedItemsById: m.FeedItemsById;
  let dummyFeedItemsState: m.FeedItemsState;
  let dummyState: any;
  let dummyEmptyState: any;

  beforeEach((): void => {
    dummyFeedItem1 = { ...dummyFeedItemData.feedItem };
    dummyFeedItem2 = { ...dummyFeedItemData.feedItem2 };
    dummyFeedItemsById = {
      [dummyFeedItem1.id]: dummyFeedItem1,
      [dummyFeedItem2.id]: dummyFeedItem2,
    };
    dummyFeedItemsState = { byId: dummyFeedItemsById };
    dummyState = { modules: { feedItems: dummyFeedItemsState } };
    dummyEmptyState = { modules: { feedItems: { byId: {} } } };
  });

  it(`returns an array containing all feedItems, when there are one or more feedItems in the state`, (): void => {
    const feedItems = selectors.getAll(dummyState);
    expect(feedItems).toStrictEqual([dummyFeedItem1, dummyFeedItem2]);
  });

  it(`returns an empty array, when there are no feedItems in the state`, (): void => {
    const feedItems = selectors.getAll(dummyEmptyState);
    expect(feedItems).toStrictEqual([]);
  });

});
