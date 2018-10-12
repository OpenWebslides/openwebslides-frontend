// @flow

import { dummyFeedItemData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`getAllById`, (): void => {

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

  it(`returns an object mapping all feedItem ids to their feedItems, when there are one or more feedItems in the state`, (): void => {
    const feedItemsById = selectors.getAllById(dummyState);
    expect(feedItemsById).toBe(dummyFeedItemsById);
  });

  it(`returns an empty object, when there are no feedItems in the state`, (): void => {
    const feedItemsById = selectors.getAllById(dummyEmptyState);
    expect(feedItemsById).toStrictEqual({});
  });

});
