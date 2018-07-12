// @flow

import type { State } from 'types/state';
import type { Identifier } from 'types/model';

import type { Event, FeedState } from './model';

const getModule = (state: State): FeedState => {
  return state.modules.feed;
};

export const getById = (state: State, id: Identifier): Event => {
  return getModule(state)[id];
};

export const getAllById = (state: State): { +[eventId: Identifier]: Event } => {
  return getModule(state);
};

export const getAll = (state: State): Array<Event> => {
  const eventsById = getAllById(state);
  return Object.keys(eventsById).map((key) => eventsById[key]);
};
