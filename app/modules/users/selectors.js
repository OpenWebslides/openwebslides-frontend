// @flow

import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import type { User, UsersState, DisplayNameAndEmailType } from './model';

const getModule = (state: State): UsersState => {
  return state.modules.users;
};

export const getById = (state: State, id: Identifier): User => {
  return getModule(state)[id];
};

// eslint-disable-next-line
export const getDisplayNameAndEmailById = (state: State, id: Identifier): DisplayNameAndEmailType => {
  const user = getModule(state)[id];
  const lastName = user.lastName == null ? '' : user.lastName;
  return {
    displayName: `${user.firstName} ${lastName}`,
    email: user.email,
  };
};

export const getAll = (state: State): Array<User> => {
  const usersById = getModule(state);
  return Object.keys(usersById).map((key) => usersById[key]);
};
