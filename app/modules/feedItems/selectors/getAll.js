// @flow

import { createSelector } from 'reselect';

import * as m from '../model';

import getAllById from './getAllById';

const getAll = createSelector(
  [getAllById],
  (feedItemsById: m.FeedItemsById): $ReadOnlyArray<m.FeedItem> => {
    return Object.keys(feedItemsById).map((key) => feedItemsById[key]);
  },
);

export default getAll;
