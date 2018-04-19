// @flow

import * as t from './actionTypes';
import type { Account, AuthState } from './model';

const initialState: AuthState = {
  authenticated: false,
  account: null,
};

const signin = (state: AuthState, action: t.SigninEmailAction | t.SigninOAuthAction): AuthState => {
  const { email } = action.payload;

  const account: Account = {
    id: 'johanjohan',
    email,
    firstName: 'John',
    lastName: 'Doe',
  };

  return {
    ...state,
    authenticated: true,
    account,
  };
};

const signup = (state: AuthState, action: t.SignupAction): AuthState => {
  const { email, firstName, lastName } = action.payload;

  const account: Account = {
    id: 'johanjohan',
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

const reducer = (state: AuthState = initialState, action: t.AuthenticationAction): AuthState => {
  switch (action.type) {
    case t.SIGNIN_EMAIL:
    case t.SIGNIN_OAUTH:
      return signin(state, action);
    case t.SIGNUP:
      return signup(state, action);
    case t.SIGNOUT:
      return signout(state);
    case t.SIGNIN_EMAIL_FAILURE:
    case t.SIGNIN_OAUTH_FAILURE:
    case t.SIGNUP_FAILURE:
    case t.SIGNOUT_FAILURE:
      return state;
    default:
      return state;
  }
};

export default reducer;
