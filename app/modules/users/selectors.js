// @flow

import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import type { UserType, UsersState } from './model';

const getModule = (state: State): UsersState => {
  return state.modules.users;
};

export const getById = (state: State, id: Identifier): UserType => {
  return getModule(state)[id];
};

export const getAll = (state: State): Array<UserType> => {
  const usersById = getModule(state);
  return Object.keys(usersById).map((key) => usersById[key]);
};
