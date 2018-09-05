// @flow

import * as a from '../actionTypes';
import * as m from '../model';

const setMultipleInState = (
  state: m.FeedItemsState,
  action: a.SetMultipleInStateAction,
): m.FeedItemsState => {
  const { feedItems } = action.payload;

  if (feedItems.length === 0) {
    return state;
  }
  else {
    const newById = { ...state.byId };

    feedItems.forEach((feedItem: m.FeedItem): void => {
      newById[feedItem.id] = feedItem;
    });

    return {
      ...state,
      byId: newById,
    };
  }
};

export default setMultipleInState;
