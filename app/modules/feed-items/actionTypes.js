// @flow

import type { Error } from 'types/error';

import type { FeedItemType } from './model';

/* Action constants */

// Reducer actions
export const SET_FEED_ITEMS: 'feed/SET_FEED_ITEMS' = 'feed/SET_FEED_ITEMS';

// Task saga actions
export const FETCH: 'feed/FETCH' = 'feed/FETCH';
export const FETCH_ERROR: 'feed/FETCH_ERROR' = 'feed/FETCH_ERROR';

// API saga actions
export const API_GET_NOTIFICATIONS: 'feed/API_GET_NOTIFICATIONS' = 'feed/API_GET_NOTIFICATIONS';

/* Action types */

// Reducer actions
export type SetFeedItemsAction = {
  type: typeof SET_FEED_ITEMS,
  payload: {
    items: ?Array<FeedItemType>,
  },
};

// Task saga actions
export type FetchAction = {
  type: typeof FETCH,
};

export type FetchErrorAction = {
  type: typeof FETCH_ERROR,
  error: Error,
};

// API saga actions
export type ApiGetNotificationsAction = {
  type: typeof API_GET_NOTIFICATIONS,
};

export type FeedAction =
  | SetFeedItemsAction;
