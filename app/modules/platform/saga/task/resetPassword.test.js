// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';
import { push } from 'connected-react-router';

import * as paths from 'config/routes';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`resetPassword`, (): void => {

  let dummyPassword: string;
  let dummyResetPasswordToken: string;

  beforeEach((): void => {
    dummyResetPasswordToken = 'foobarToken';
    dummyPassword = 'P@ssword1';
  });

  it(`puts an apiPatchPassword action and redirects to signin on successful request`, (): void => {
    const dummyAction = actions.resetPassword(dummyPassword, dummyResetPasswordToken);

    return expectSaga(sagas.resetPassword, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_PATCH_PASSWORD) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiPatchPassword(dummyPassword, dummyResetPasswordToken))
      .put(push(paths.AUTH_SIGNIN_ROUTE))
      .run();
  });

});
