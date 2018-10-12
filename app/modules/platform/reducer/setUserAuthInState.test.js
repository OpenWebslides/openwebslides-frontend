// @flow

import * as a from '../actionTypes';
import * as m from '../model';

import reducer, { initialState } from '.';

describe(`setUserAuthInState`, (): void => {

  it(`sets the passed userAuth prop in the state, when the passed auth prop is not NULL`, (): void => {
    const dummyUserAuth: m.UserAuth = {
      userId: 'dummyUserId',
      apiToken: 'foobarToken',
    };

    const prevState: m.PlatformState = {
      ...initialState,
      userAuth: null,
    };
    const setUserAuthInStateAction: a.SetUserAuthInStateAction = {
      type: a.SET_USER_AUTH_IN_STATE,
      payload: {
        userAuth: dummyUserAuth,
      },
    };
    const nextState: m.PlatformState = {
      ...initialState,
      userAuth: dummyUserAuth,
    };
    const resultState = reducer(prevState, setUserAuthInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
  });

  it(`sets auth to NULL in the state, when the passed auth prop is NULL`, (): void => {
    const dummyUserAuth: m.UserAuth = {
      userId: 'dummyUserId',
      apiToken: 'foobarToken',
    };

    const prevState: m.PlatformState = {
      ...initialState,
      userAuth: dummyUserAuth,
    };
    const setUserAuthInStateAction: a.SetUserAuthInStateAction = {
      type: a.SET_USER_AUTH_IN_STATE,
      payload: {
        userAuth: null,
      },
    };
    const nextState: m.PlatformState = {
      ...initialState,
      userAuth: null,
    };
    const resultState = reducer(prevState, setUserAuthInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
  });

  it(`replaces a previous auth prop in the state, when the passed auth prop is not NULL and the state already had an non-NULL auth prop`, (): void => {
    const dummyUserAuth1: m.UserAuth = {
      userId: 'dummyUserId',
      apiToken: 'foobarToken',
    };
    const dummyUserAuth2: m.UserAuth = {
      userId: 'secondDummyId',
      apiToken: 'tokenFoobar',
    };

    const prevState: m.PlatformState = {
      ...initialState,
      userAuth: dummyUserAuth1,
    };
    const setUserAuthInStateAction: a.SetUserAuthInStateAction = {
      type: a.SET_USER_AUTH_IN_STATE,
      payload: {
        userAuth: dummyUserAuth2,
      },
    };
    const nextState: m.PlatformState = {
      ...initialState,
      userAuth: dummyUserAuth2,
    };
    const resultState = reducer(prevState, setUserAuthInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
  });

  it(`returns the passed state unchanged, when the passed userAuth prop is identical to the previous one`, (): void => {
    const dummyUserAuth1: m.UserAuth = {
      userId: 'dummyUserId',
      apiToken: 'foobarToken',
    };
    const dummyUserAuth2: m.UserAuth = {
      userId: 'dummyUserId',
      apiToken: 'foobarToken',
    };

    const prevState: m.PlatformState = {
      ...initialState,
      userAuth: dummyUserAuth1,
    };
    const setUserAuthInStateAction: a.SetUserAuthInStateAction = {
      type: a.SET_USER_AUTH_IN_STATE,
      payload: {
        userAuth: dummyUserAuth2,
      },
    };
    const resultState = reducer(prevState, setUserAuthInStateAction);

    expect(resultState).toBe(prevState);
  });

});
