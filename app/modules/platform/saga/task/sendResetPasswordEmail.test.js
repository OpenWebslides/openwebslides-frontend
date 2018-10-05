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

describe(`sendResetPasswordEmail`, (): void => {

  let dummyEmail: string;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
  });

  it(`puts an apiPostPassword action and redirects to signin on successful request`, (): void => {
    const dummyAction = actions.sendResetPasswordEmail(dummyEmail);

    return expectSaga(sagas.sendResetPasswordEmail, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_POST_PASSWORD) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiPostPassword(dummyEmail))
      .put(push(paths.AUTH_SIGNIN_ROUTE))
      .run();
  });

});
