// @flow

import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import type { User, UsersState } from './model';

const getModule = (state: State): UsersState => {
  return state.modules.users;
};

export const getById = (state: State, id: Identifier): User => {
  return getModule(state)[id];
};

export const getUserNameById = (state: State, id: Identifier): string => {
  const user = getModule(state)[id];
  const lastName = user.lastName == null ? '' : user.lastName;
  return `${user.firstName} ${lastName}`;
};

export const getAllById = (state: State): { +[userId: Identifier]: User } => {
  return getModule(state);
};

export const getAll = (state: State): Array<User> => {
  const usersById = getAllById(state);
  return Object.keys(usersById).map((key) => usersById[key]);
};
