// @flow

import { createSelector } from 'reselect';

import * as m from '../model';

import getUserAuth from './getUserAuth';

const isAuthenticated = createSelector(
  [getUserAuth],
  (userAuth: ?m.UserAuth): boolean => {
    return (userAuth !== null);
  },
);

export default isAuthenticated;
