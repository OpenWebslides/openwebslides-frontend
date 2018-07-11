// @flow

import * as t from './actionTypes';
import type { Event } from './model';

// Reducer actions
export const setEventsInState = (
  items: ?Array<Event>,
): t.SetEventsAction => {
  return {
    type: t.SET_EVENTS,
    payload: {
      items,
    },
  };
};

// Task saga actions
export const fetch = (
): t.FetchAction => {
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
