// @flow

import type { State } from 'types/state';
import type { Account, AuthState } from './model';

const getModule = (state: State): AuthState => {
  return state.modules.authentication;
};

const isAuthenticated = (state: State): AuthState => {
  return getModule(state).authenticated;
};

const getAccount = (state: State): AuthState => {
  return getModule(state).account;
};

export {
  isAuthenticated,
  getAccount,
};
