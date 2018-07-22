// @flow

import type { State } from 'types/state';

import type { Event, FeedState } from './model';

const getModule = (state: State): FeedState => {
  return state.modules.feed;
};

export const getById = (state: State, id: string): Event => {
  return getModule(state)[id];
};

export const getAllById = (state: State): { +[eventId: string]: Event } => {
  return getModule(state);
};

export const getAll = (state: State): Array<Event> => {
  const eventsById = getAllById(state);
  return Object.keys(eventsById).map((key) => eventsById[key]);
};
