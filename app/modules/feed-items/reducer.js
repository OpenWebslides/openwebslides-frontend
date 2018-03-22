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

const reducer = (state: FeedItemsState = initialState, action: t.FeedAction): FeedItemsState => {
  switch (action.type) {
    case t.ADD:
      return add(state, action);
    case t.ADD_ERROR:
      return state;
    default:
      // Type error when not all action.type cases are handled.
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default reducer;
