// @flow

import type { Error } from 'types/error';

import type { Event } from './model';

/* Action constants */

// Reducer actions
export const SET_EVENTS: 'feed/SET_EVENTS' = 'feed/SET_EVENTS';

// Task saga actions
export const FETCH: 'feed/FETCH' = 'feed/FETCH';
export const FETCH_ERROR: 'feed/FETCH_ERROR' = 'feed/FETCH_ERROR';

// API saga actions
export const API_GET_NOTIFICATIONS: 'feed/API_GET_NOTIFICATIONS' = 'feed/API_GET_NOTIFICATIONS';

/* Action types */

// Reducer actions
export type SetEventsAction = {
  type: typeof SET_EVENTS,
  payload: {
    items: ?Array<Event>,
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
  | SetEventsAction;
