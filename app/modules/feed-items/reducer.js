// @flow

import { dummyFeedItems } from './dummyData';

import * as t from './actionTypes';
import type { FeedItemType, FeedItemsState } from './model';

const initialState: FeedItemsState = dummyFeedItems;

const fetch = (state: FeedItemsState, action: t.FetchSuccessAction): FeedItemsState => {
  const newFeedItems = {};

  action.data.forEach((item: FeedItemType): void => {
    newFeedItems[item.id] = item;
  });

  return {
    ...state,
    ...newFeedItems,
  };
};

const reducer = (state: FeedItemsState = initialState, action: t.FeedAction): FeedItemsState => {
  switch (action.type) {
    case t.FETCH_FEED_SUCCESS:
      return fetch(state, action);
    case t.FETCH_FEED_FAILURE:
      return state;
    default:
      return state;
  }
};

export default reducer;
