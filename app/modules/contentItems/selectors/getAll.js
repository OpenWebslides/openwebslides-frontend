// @flow

import { createSelector } from 'reselect';

import type { ContentItem, ContentItemsById } from '../model';
import getAllById from './getAllById';

const getAll = createSelector(
  [getAllById],
  (contentItemsById: ContentItemsById): Array<ContentItem> => {
    return Object.keys(contentItemsById).map((key) => contentItemsById[key]);
  },
);

export default getAll;
