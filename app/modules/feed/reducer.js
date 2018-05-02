// @flow

import * as t from './actionTypes';
import type { Event, FeedState } from './model';

const initialState: FeedState = {};

const setEvents = (state: FeedState, action: t.SetEventsAction): FeedState => {
  const newEvents = {};

  if (action.payload.items) {
    action.payload.items.forEach((item: Event): void => {
      newEvents[item.id] = item;
    });
  }

  return newEvents;
};

const reducer = (state: FeedState = initialState, action: t.FeedAction): FeedState => {
  switch (action.type) {
    case t.SET_EVENTS:
      return setEvents(state, action);
    default:
      return state;
  }
};

export default reducer;
