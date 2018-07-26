// @flow

import { createSelector } from 'reselect';

import * as m from '../model';

import getAllById from './getAllById';

const getAll = createSelector(
  [getAllById],
  (usersById: m.UsersById): Array<m.User> => {
    return Object.keys(usersById).map((key) => usersById[key]);
  },
);

export default getAll;
