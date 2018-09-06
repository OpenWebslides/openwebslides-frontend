// @flow

import _ from 'lodash';
import { createSelector } from 'reselect';

import * as m from '../model';

import getAllById from './getAllById';

const getAllSortedDescByTimestamp = createSelector(
  [getAllById],
  (feedItemsById: m.FeedItemsById): $ReadOnlyArray<m.FeedItem> => {
    const feedItems = Object.keys(feedItemsById).map((key) => feedItemsById[key]);
    return _.sortBy(feedItems, ['timestamp']).reverse();
  },
);

export default getAllSortedDescByTimestamp;
