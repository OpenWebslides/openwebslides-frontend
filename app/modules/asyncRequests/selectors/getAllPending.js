// @flow

import { createSelector } from 'reselect';

import * as m from '../model';

import getAllById from './getAllById';

const getAllPending = createSelector(
  [getAllById],
  (asyncRequestsById: m.AsyncRequestsById): $ReadOnlyArray<m.AsyncRequest> => {
    return Object.keys(asyncRequestsById)
      .map((key) => asyncRequestsById[key])
      .filter(
        (asyncRequest: m.AsyncRequest): boolean => asyncRequest.status === m.statusTypes.PENDING,
      );
  },
);

export default getAllPending;
