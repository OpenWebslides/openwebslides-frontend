// @flow

import { createSelector } from 'reselect';

import { type AppState } from 'types/redux';

import * as m from '../model';

import getAllById from './getAllById';

const getAll = createSelector<AppState, ?{}, $ReadOnlyArray<m.ContentItem>, m.ContentItemsById>(
  [getAllById],
  (contentItemsById: m.ContentItemsById): $ReadOnlyArray<m.ContentItem> => {
    return Object.keys(contentItemsById).map((key) => contentItemsById[key]);
  },
);

export default getAll;
