// @flow

import { createSelector } from 'reselect';

import * as m from '../model';

import getAllById from './getAllById';

const getAll = createSelector(
  [getAllById],
  (asyncRequestsById: m.AsyncRequestsById): $ReadOnlyArray<m.AsyncRequest> => {
    return Object.keys(asyncRequestsById).map((key) => asyncRequestsById[key]);
  },
);

export default getAll;
