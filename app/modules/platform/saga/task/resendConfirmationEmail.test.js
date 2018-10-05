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

describe(`resendConfirmationEmail`, (): void => {

  let dummyEmail: string;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
  });

  it(`puts an apiPostConfirmation action and redirects to signin on successful request`, (): void => {
    const dummyAction = actions.resendConfirmationEmail(dummyEmail);

    return expectSaga(sagas.resendConfirmationEmail, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_POST_CONFIRMATION) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiPostConfirmation(dummyEmail))
      .put(push(paths.AUTH_SIGNIN_ROUTE))
      .run();
  });

});
