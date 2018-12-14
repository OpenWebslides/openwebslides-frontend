// @flow

import _ from 'lodash';
import { createSelector } from 'reselect';

import { type AppState } from 'types/redux';

import * as m from '../model';

import getAllByCurrentUser from './getAllByCurrentUser';

const getAllByCurrentUserSortedDescByTimestamp = createSelector<
  AppState, ?{}, $ReadOnlyArray<m.Alert>, $ReadOnlyArray<m.Alert>
>(
  [getAllByCurrentUser],
  (alertsByCurrentUser: $ReadOnlyArray<m.Alert>): $ReadOnlyArray<m.Alert> => {
    return _.sortBy(alertsByCurrentUser, ['timestamp']).reverse();
  },
);

export default getAllByCurrentUserSortedDescByTimestamp;
