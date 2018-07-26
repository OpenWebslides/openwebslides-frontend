// @flow

import { type State } from 'types/state';

import * as m from './model';

const getModule = (state: State): m.FeedState => {
  return state.modules.feed;
};

export const getById = (state: State, id: string): m.Event => {
  return getModule(state)[id];
};

export const getAllById = (state: State): { +[eventId: string]: m.Event } => {
  return getModule(state);
};

export const getAll = (state: State): $ReadOnlyArray<m.Event> => {
  const eventsById = getAllById(state);
  return Object.keys(eventsById).map((key) => eventsById[key]);
};
