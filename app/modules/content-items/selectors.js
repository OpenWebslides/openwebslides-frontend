// @flow

import _ from 'lodash';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import type { ContentItem, ContentItemsState } from './model';

const getModule = (state: State): ContentItemsState => {
  return state.modules.contentItems;
};

export const getById = (state: State, id: Identifier): ContentItem => {
  return _.get(getModule(state), id, null);
};

export const getAllById = (state: State): { +[contentItemId: Identifier]: ContentItem } => {
  return getModule(state);
};

export const getAll = (state: State): Array<ContentItem> => {
  const contentItemsById = getAllById(state);
  return Object.keys(contentItemsById).map((key) => contentItemsById[key]);
};
