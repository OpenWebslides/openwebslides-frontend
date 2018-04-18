// @flow

import type { State } from 'types/state';
import type { Account, AuthState } from './model';

const getModule = (state: State): AuthState => {
  return state.modules.authentication;
};

const isAuthenticated = (state: State): boolean => {
  const module: AuthState = getModule(state);
  return module ? module.authenticated : false;
};

const getAccount = (state: State): ?Account => {
  const module: AuthState = getModule(state);
  return module ? module.account : null;
};

const getToken = (state: State): ?string => {
  const module: AuthState = getModule(state);
  return module ? module.token : null;
}

export {
  isAuthenticated,
  getAccount,
  getToken,
};
