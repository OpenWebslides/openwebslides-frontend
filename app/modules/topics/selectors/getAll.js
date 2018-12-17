// @flow

import { createSelector } from 'reselect';

import { type AppState } from 'types/redux';

import * as m from '../model';

import getAllById from './getAllById';

const getAll = createSelector<AppState, ?{}, $ReadOnlyArray<m.Topic>, m.TopicsById>(
  [getAllById],
  (topicsById: m.TopicsById): $ReadOnlyArray<m.Topic> => {
    return Object.keys(topicsById).map((key) => topicsById[key]);
  },
);

export default getAll;
