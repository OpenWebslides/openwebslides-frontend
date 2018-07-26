// @flow

import * as a from './actionTypes';
import * as m from './model';

const initialState: m.FeedState = {};

const setEvents = (state: m.FeedState, action: a.SetEventsAction): m.FeedState => {
  const newEvents = {};

  if (action.payload.items) {
    action.payload.items.forEach((item: m.Event): void => {
      newEvents[item.id] = item;
    });
  }

  return newEvents;
};

const reducer = (state: m.FeedState = initialState, action: a.ReducerAction): m.FeedState => {
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
