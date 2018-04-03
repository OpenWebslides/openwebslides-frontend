// @flow

import { dummyFeedItems } from './dummyData';

import * as t from './actionTypes';
import type { FeedItemType, FeedItemsState } from './model';

const initialState: FeedItemsState = dummyFeedItems;

const add = (state: FeedItemsState, action: t.AddAction): FeedItemsState => {
  const {
    id,
    userId,
    topicId,
    predicate,
    timestamp,
  } = action.payload;

  const newFeedItem: FeedItemType = {
    id,
    userId,
    topicId,
    predicate,
    timestamp,
  };

  return {
    ...state,
    [id]: newFeedItem,
  };
};

const fetch = (state: FeedItemsState, action: t.FetchAction): FeedItemsState => {
  const newFeedItems = {};

  action.data.forEach((item) => {
    newFeedItems[item.id] = item;
  });

  return {
    ...state,
    ...newFeedItems,
  };
};

const reducer = (state: FeedItemsState = initialState, action: t.FeedAction): FeedItemsState => {
  switch (action.type) {
    case t.ADD:
      return add(state, action);
    case t.ADD_ERROR:
      return state;
    case t.FETCH_FEED_SUCCESS:
      return fetch(state, action);
    case t.FETCH_FEED_FAILURE:
      return state;
    default:
      // Type error when not all action.type cases are handled.
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default reducer;
