// @flow

import reducer from '../reducer';
import * as t from '../actionTypes';
import type { AuthState } from '../model';

const emptyState: AuthState = {
  authenticated: false,
  account: null,
  token: null,
};

describe(`reducer`, (): void => {
  it(`handles SET_ACCOUNT action`, (): void => {
    const setAccountAction: t.SetAccountAction = {
      type: t.SET_ACCOUNT,
      payload: {
        account: {
          id: '3',
          email: 'foo@bar',
          firstName: 'Foo',
        },
      },
    };

    const nextState: AuthState = {
      authenticated: false,
      account: {
        id: '3',
        email: 'foo@bar',
        firstName: 'Foo',
      },
      token: null,
    };

    expect(reducer(emptyState, setAccountAction)).toEqual(nextState);
  });

  it(`handles SET_TOKEN action`, (): void => {
    const setTokenAction: t.SetTokenAction = {
      type: t.SET_TOKEN,
      payload: {
        token: 'foobartoken',
      },
    };

    const nextState: AuthState = {
      authenticated: true,
      account: null,
      token: 'foobartoken',
    };

    expect(reducer(emptyState, setTokenAction)).toEqual(nextState);
  });
});
