// @flow

import { type State } from 'types/state';

import * as m from './model';

export const getById = (state: State, id: string): m.FeedItem => {
  return state.modules.feedItems.byId[id];
};

export const getAllById = (state: State): m.FeedItemsById => {
  return state.modules.feedItems.byId;
};

export const getAll = (state: State): $ReadOnlyArray<m.FeedItem> => {
  const eventsById = getAllById(state);
  return Object.keys(eventsById).map((key) => eventsById[key]);
};
