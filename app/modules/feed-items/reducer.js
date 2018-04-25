// @flow

import * as t from './actionTypes';
import type { FeedItemType, FeedItemsState } from './model';

const initialState: FeedItemsState = {};

const setFeedItems = (state: FeedItemsState, action: t.SetFeedItemsAction): FeedItemsState => {
  const newFeedItems = {};


  if (action.payload.items) {
    action.payload.items.forEach((item: FeedItemType): void => {
      newFeedItems[item.id] = item;
    });
  }

  return newFeedItems;
};

const reducer = (state: FeedItemsState = initialState, action: t.FeedAction): FeedItemsState => {
  switch (action.type) {
    case t.SET_FEED_ITEMS:
      return setFeedItems(state, action);
    default:
      return state;
  }
};

export default reducer;
