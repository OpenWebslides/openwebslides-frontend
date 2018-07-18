// @flow

import * as t from '../../actionTypes';
import * as m from '../../model';

import actions from '.';

describe(`setUserAuthInState`, (): void => {

  it(`returns a platform SET_USER_AUTH_IN_STATE action containing the passed props`, (): void => {
    const dummyUserAuth: m.UserAuth = {
      userId: 'dummyUserId',
      apiToken: 'foobarToken',
    };
    const expectedAction: t.SetUserAuthInStateAction = {
      type: t.SET_USER_AUTH_IN_STATE,
      payload: {
        userAuth: dummyUserAuth,
      },
    };
    const actualAction = actions.setUserAuthInState(dummyUserAuth);
    expect(actualAction).toEqual(expectedAction);
  });

  it(`converts an auth argument of UNDEFINED to NULL`, (): void => {
    const expectedAction: t.SetUserAuthInStateAction = {
      type: t.SET_USER_AUTH_IN_STATE,
      payload: {
        userAuth: null,
      },
    };
    const actualAction = actions.setUserAuthInState();
    expect(actualAction).toEqual(expectedAction);
  });

});
