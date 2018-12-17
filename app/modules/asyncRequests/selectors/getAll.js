// @flow

import { createSelector } from 'reselect';

import { type AppState } from 'types/redux';

import * as m from '../model';

import getAllById from './getAllById';

const getAll = createSelector<AppState, ?{}, $ReadOnlyArray<m.AsyncRequest>, m.AsyncRequestsById>(
  [getAllById],
  (asyncRequestsById: m.AsyncRequestsById): $ReadOnlyArray<m.AsyncRequest> => {
    return Object.keys(asyncRequestsById).map((key) => asyncRequestsById[key]);
  },
);

export default getAll;
