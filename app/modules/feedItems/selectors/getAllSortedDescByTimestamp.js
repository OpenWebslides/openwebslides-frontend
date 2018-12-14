// @flow

import _ from 'lodash';
import { createSelector } from 'reselect';

import { type AppState } from 'types/redux';

import * as m from '../model';

import getAllById from './getAllById';

const getAllSortedDescByTimestamp = createSelector<
    AppState, ?{}, $ReadOnlyArray<m.FeedItem>, m.FeedItemsById
>(
  [getAllById],
  (feedItemsById: m.FeedItemsById): $ReadOnlyArray<m.FeedItem> => {
    const feedItems = Object.keys(feedItemsById).map((key) => feedItemsById[key]);
    return _.sortBy(feedItems, ['timestamp']).reverse();
  },
);

export default getAllSortedDescByTimestamp;
