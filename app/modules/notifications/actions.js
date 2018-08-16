// @flow

import * as a from './actionTypes';
import * as m from './model';

// Reducer actions
export const setEventsInState = (
  items: ?$ReadOnlyArray<m.Notification>,
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
