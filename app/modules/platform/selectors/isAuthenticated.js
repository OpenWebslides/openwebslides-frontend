// @flow

import { createSelector } from 'reselect';

import { type AppState } from 'types/redux';

import * as m from '../model';

import getUserAuth from './getUserAuth';

const isAuthenticated = createSelector<AppState, ?{}, boolean, ?m.UserAuth>(
  [getUserAuth],
  (userAuth: ?m.UserAuth): boolean => {
    return (userAuth !== null);
  },
);

export default isAuthenticated;
