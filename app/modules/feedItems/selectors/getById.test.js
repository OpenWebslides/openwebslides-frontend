// @flow

import { dummyFeedItemData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`getById`, (): void => {

  let dummyFeedItem1: m.FeedItem;
  let dummyFeedItem2: m.FeedItem;
  let dummyFeedItemsById: m.FeedItemsById;
  let dummyFeedItemsState: m.FeedItemsState;
  let dummyState: any;

  beforeEach((): void => {
    dummyFeedItem1 = { ...dummyFeedItemData.feedItem };
    dummyFeedItem2 = { ...dummyFeedItemData.feedItem2 };
    dummyFeedItemsById = {
      [dummyFeedItem1.id]: dummyFeedItem1,
      [dummyFeedItem2.id]: dummyFeedItem2,
    };
    dummyFeedItemsState = { byId: dummyFeedItemsById };
    dummyState = { modules: { feedItems: dummyFeedItemsState } };
  });

  it(`returns the correct feedItem for the given id, when the given id is valid`, (): void => {
    const feedItem = selectors.getById(dummyState, { id: dummyFeedItem1.id });
    expect(feedItem).toBe(dummyFeedItem1);
  });

  it(`returns NULL, when the given id is invalid`, (): void => {
    const feedItem = selectors.getById(dummyState, { id: 'InvalidId' });
    expect(feedItem).toBeNull();
  });

});
