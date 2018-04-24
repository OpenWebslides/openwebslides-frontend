// @flow

import * as t from './actionTypes';
import type { AuthState } from './model';

const initialState: AuthState = {
  authenticated: false,
  account: null,
  token: null,
};

const setAccount = (state: AuthState, action: t.SetAccountAction): AuthState => {
  const { account } = action.payload;

  return {
    ...state,
    account,
  };
};

const setToken = (state: AuthState, action: t.SetTokenAction): AuthState => {
  const { token } = action.payload;

  return {
    ...state,
    authenticated: (token !== null),
    token,
  };
};

const reducer = (state: AuthState = initialState, action: t.AuthenticationAction): AuthState => {
  switch (action.type) {
    case t.SET_ACCOUNT:
      return setAccount(state, action);
    case t.SET_TOKEN:
      return setToken(state, action);
    default:
      return state;
  }
};

export default reducer;
