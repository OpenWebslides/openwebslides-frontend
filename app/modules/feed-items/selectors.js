// @flow

import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import type { FeedItemType, FeedItemsState } from './model';

const getModule = (state: State): FeedItemsState => {
  return state.modules.feedItems;
};

export const getById = (state: State, id: Identifier): FeedItemType => {
  return getModule(state)[id];
};

export const getAllById = (state: State): { +[feedItemId: Identifier]: FeedItemType } => {
  return getModule(state);
};

export const getAll = (state: State): Array<FeedItemType> => {
  const feedItemsById = getAllById(state);
  return Object.keys(feedItemsById).map((key) => feedItemsById[key]);
};
