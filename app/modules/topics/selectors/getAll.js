// @flow

import { createSelector } from 'reselect';

import * as m from '../model';

import getAllById from './getAllById';

const getAll = createSelector(
  [getAllById],
  (topicsById: m.TopicsById): $ReadOnlyArray<m.Topic> => {
    return Object.keys(topicsById).map((key) => topicsById[key]);
  },
);

export default getAll;
