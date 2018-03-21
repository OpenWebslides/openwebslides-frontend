// @flow

import * as t from './actionTypes';
import type { Account, AuthState } from './model';

const initialState: AuthState = {
  authenticated: true,
  account: {
    id: 'ieieie1234',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  },
};

const signin = (state: AuthState, action: t.SigninEmailAction | t.SigninOAuthAction): AuthState => {
  const { email } = action.payload;

  const account: Account = {
    id: 'baz',
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
    id: 'baz',
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
    case t.SIGNIN_EMAIL_ERROR:
    case t.SIGNIN_OAUTH_ERROR:
    case t.SIGNUP_ERROR:
    case t.SIGNOUT_ERROR:
      return state;
    default:
      // Type error when not all action.type cases are handled.
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default reducer;
