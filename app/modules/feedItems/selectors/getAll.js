// @flow

import { createSelector } from 'reselect';

import { type AppState } from 'types/redux';

import * as m from '../model';

import getAllById from './getAllById';

const getAll = createSelector<AppState, ?{}, $ReadOnlyArray<m.FeedItem>, m.FeedItemsById>(
  [getAllById],
  (feedItemsById: m.FeedItemsById): $ReadOnlyArray<m.FeedItem> => {
    return Object.keys(feedItemsById).map((key) => feedItemsById[key]);
  },
);

export default getAll;
