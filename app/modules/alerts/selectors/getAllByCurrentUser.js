// @flow

import { createSelector } from 'reselect';

import platform from 'modules/platform';

import * as m from '../model';

import getAll from './getAll';

const getAllByCurrentUser = createSelector(
  [getAll, platform.selectors.getUserAuth],
  (
    alerts: $ReadOnlyArray<m.Alert>,
    userAuth: ?platform.model.UserAuth,
  ): $ReadOnlyArray<m.Alert> => {
    const userId = userAuth ? userAuth.userId : null;

    return alerts.filter((alert: m.Alert): boolean => {
      return alert.userId === userId;
    });
  },
);

export default getAllByCurrentUser;
