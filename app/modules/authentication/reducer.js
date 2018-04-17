// @flow

import * as t from './actionTypes';
import type { Account, AuthState } from './model';

const initialState: AuthState = {
  authenticated: false,
  account: null,
};

const signin = (state: AuthState, action: t.SigninSuccessAction): AuthState => {
  const { id, email, firstName, lastName } = action.payload;

  const account: Account = {
    id,
    email,
    firstName,
    lastName,
  };

  return {
    ...state,
    authenticated: true,
    account,
  };
};

const signup = (state: AuthState, action: t.SignupSuccessAction): AuthState => {
  const { email, firstName, lastName } = action.payload;

  const account: Account = {
    id: 'markfrank1',
    email,
    firstName,
    lastName,
  };

  return {
    ...state,
    authenticated: true,
    account,
  };
};

const signout = (state: AuthState): AuthState => {
  return {
    ...state,
    authenticated: false,
    account: null,
  };
};

const updateToken = (state: AuthState, action: t.UpdateTokenAction): AuthState => {
  return {
    ...state,
    token: action.payload.token,
  };
};

const reducer = (state: AuthState = initialState, action: t.AuthenticationAction): AuthState => {
  switch (action.type) {
    case t.SIGNIN_EMAIL_SUCCESS:
    case t.SIGNIN_OAUTH_SUCCESS:
      return signin(state, action);
    case t.SIGNUP_SUCCES:
      return signup(state, action);
    case t.SIGNOUT_SUCCES:
      return signout(state);
    case t.SIGNIN_EMAIL_FAILURE:
    case t.SIGNIN_OAUTH_FAILURE:
    case t.SIGNUP_FAILURE:
    case t.SIGNOUT_FAILURE:
      return state;
    case t.UPDATE_TOKEN:
      return updateToken(state, action);
    default:
      return state;
  }
};

export default reducer;
