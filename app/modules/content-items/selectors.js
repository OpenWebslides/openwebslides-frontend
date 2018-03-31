// @flow

import _ from 'lodash';
import { createSelector } from 'reselect';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import denormalize from './lib/denormalize';
import type {
  ContentItem,
  DenormalizedContentItem,
  ContentItemsById,
  ContentItemsState,
} from './model';

const getModule = (state: State): ContentItemsState => {
  return state.modules.contentItems;
};

export const getAllById = (state: State): ContentItemsById => {
  return getModule(state).byId;
};

export const getAll = createSelector(
  [getAllById],
  (contentItemsById: ContentItemsById): Array<ContentItem> => {
    return Object.keys(contentItemsById).map((key) => contentItemsById[key]);
  },
);

export const getById = (state: State, props: { id: Identifier }): ?ContentItem => {
  return _.get(getAllById(state), props.id, null);
};

export const getDenormalizedById = createSelector(
  [getById, getAllById],
  (contentItem: ?ContentItem, contentItemsById: ContentItemsById): ?DenormalizedContentItem => {
    return denormalize(contentItem, contentItemsById);
  },
);
