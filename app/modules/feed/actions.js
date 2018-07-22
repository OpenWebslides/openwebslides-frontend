// @flow

import * as a from './actionTypes';
import type { Event } from './model';

// Reducer actions
export const setEventsInState = (
  items: ?Array<Event>,
): a.SetEventsAction => {
  return {
    type: a.SET_EVENTS,
    payload: {
      items,
    },
  };
};

// Task saga actions
export const fetch = (
): a.FetchAction => {
  return {
    type: a.FETCH,
  };
};

// API saga actions
export const apiGetNotifications = (
): a.ApiGetNotificationsAction => {
  return {
    type: a.API_GET_NOTIFICATIONS,
  };
};
