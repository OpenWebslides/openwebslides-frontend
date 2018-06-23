// @flow

import _ from 'lodash';
import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import denormalize from './lib/denormalize';
import type {
  ContentItem,
  DenormalizedContentItem,
  ContentItemsById,
  ContentItemsState,
} from './model';
import find from './lib/find';

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

export const getCurrentlyEditing = createSelector(
  [getAllById],
  (contentItemsById: ContentItemsById): ?ContentItem => {
    const currentlyEditingItem = _.find(
      // eslint-disable-next-line flowtype/no-weak-types
      (contentItemsById: any),
      (contentItem: ContentItem): boolean => {
        return contentItem.isEditing;
      },
    );
    return currentlyEditingItem || null;
  },
);

export const getById = (state: State, props: { id: Identifier }): ?ContentItem => {
  return _.get(getAllById(state), props.id, null);
};

export const getDenormalizedById = createCachedSelector(
  [getById, getAllById],
  (contentItem: ?ContentItem, contentItemsById: ContentItemsById): ?DenormalizedContentItem => {
    return denormalize(contentItem, contentItemsById);
  },
)(
  (state: State, props: { id: Identifier }) => props.id,
);

export const getSelfAndAllDescendantsById = createCachedSelector(
  [getById, getAllById],
  (contentItem: ?ContentItem, contentItemsById: ContentItemsById): Array<ContentItem> => {
    if (contentItem == null) return [];

    const allDescendantItems = find.allDescendantItems(contentItem, contentItemsById);
    return [
      contentItem,
      ...allDescendantItems,
    ];
  },
)(
  (state: State, props: { id: Identifier }) => props.id,
);
