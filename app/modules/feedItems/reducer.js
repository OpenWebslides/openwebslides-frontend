// @flow

import * as a from './actionTypes';
import * as m from './model';

const initialState: m.FeedItemsState = { byId: {} };

const setEvents = (
  state: m.FeedItemsState,
  action: a.SetEventsAction,
): m.FeedItemsState => {
  const newEvents = { byId: {} };

  if (action.payload.items) {
    action.payload.items.forEach((item: m.FeedItem): void => {
      newEvents.byId[item.id] = item;
    });
  }

  return newEvents;
};

const reducer = (
  state: m.FeedItemsState = initialState,
  action: a.ReducerAction,
): m.FeedItemsState => {
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
