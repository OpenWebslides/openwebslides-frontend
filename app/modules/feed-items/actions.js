// @flow

import type { FeedItemType } from './model';

import * as t from './actionTypes';

// Reducer actions
export const setFeedItemsInState = (
  items: ?Array<FeedItemType>,
): t.SetFeedItemsAction => {
  return {
    type: t.SET_FEED_ITEMS,
    payload: {
      items,
    },
  };
};

// Task saga actions
export const fetch = (
): t.FetchAction | t.FetchErrorAction => {
  return {
    type: t.FETCH,
  };
};

// API saga actions
export const apiGetNotifications = (
): t.ApiGetNotificationsAction => {
  return {
    type: t.API_GET_NOTIFICATIONS,
  };
};
