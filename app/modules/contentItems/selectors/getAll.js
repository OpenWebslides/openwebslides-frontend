// @flow

import { createSelector } from 'reselect';

import * as m from '../model';

import getAllById from './getAllById';

const getAll = createSelector(
  [getAllById],
  (contentItemsById: m.ContentItemsById): $ReadOnlyArray<m.ContentItem> => {
    return Object.keys(contentItemsById).map((key) => contentItemsById[key]);
  },
);

export default getAll;
