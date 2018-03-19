// @flow

import type { State } from 'types/state';
import type { Account, AuthState } from './model';

const getAccount = (state: State): AuthState => {
  return state.account;
};

export {
  getAccount
};
