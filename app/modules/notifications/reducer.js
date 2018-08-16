// @flow

import * as a from './actionTypes';
import * as m from './model';

const initialState: m.NotificationsState = {};

const setEvents = (
  state: m.NotificationsState,
  action: a.SetEventsAction,
): m.NotificationsState => {
  const newEvents = {};

  if (action.payload.items) {
    action.payload.items.forEach((item: m.Notification): void => {
      newEvents[item.id] = item;
    });
  }

  return newEvents;
};

const reducer = (
  state: m.NotificationsState = initialState,
  action: a.ReducerAction,
): m.NotificationsState => {
  switch (action.type) {
    case a.SET_EVENTS:
      return setEvents(state, action);
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      (action: empty);
      return state;
  }
};

export default reducer;
