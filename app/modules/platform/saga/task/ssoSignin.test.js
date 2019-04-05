// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`setUserAuth`, (): void => {

  let dummyRefreshToken: string;
  let dummyUserId: string;

  beforeEach((): void => {
    dummyRefreshToken = 'dummyRefreshToken';
    dummyUserId = 'dummyUserId';
  });

  it(`puts a SET_USER_AUTH_IN_STATE action, and a REFRESH action`, (): void => {
    const dummyAction = actions.ssoSignin(dummyUserId, dummyRefreshToken);

    return expectSaga(sagas.ssoSignin, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.REFRESH) ? null : next();
        })],
      ])
      .put(actions.setUserAuthInState({ userId: dummyUserId, refreshToken: dummyRefreshToken, accessToken: null }))
      .call(asyncRequests.lib.putAndReturn, actions.refresh())
      .run();
  });

});
