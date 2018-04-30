// @flow

import type { State } from 'types/state';
import type { User } from 'modules/users';

import type { AuthState } from './model';

const getModule = (state: State): AuthState => {
  return state.modules.authentication;
};

const isAuthenticated = (state: State): boolean => {
  const module: AuthState = getModule(state);
  return module ? module.authenticated : false;
};

const getAccount = (state: State): ?User => {
  const module: AuthState = getModule(state);
  return module ? module.account : null;
};

const getToken = (state: State): ?string => {
  const module: AuthState = getModule(state);
  return module ? module.token : null;
};

export {
  isAuthenticated,
  getAccount,
  getToken,
};
