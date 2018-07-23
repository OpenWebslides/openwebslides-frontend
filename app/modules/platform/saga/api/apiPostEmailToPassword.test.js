// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`apiPostEmailToPassword`, (): void => {

  let dummyEmail: string;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
  });

  it(`executes a post request for the passed email to the password API endpoint`, (): void => {
    const dummyAction = actions.apiPostEmailToPassword(dummyEmail);
    const dummyApiResponse = { status: 200 };

    return expectSaga(sagas.apiPostEmailToPassword, dummyAction)
      .provide([
        [call(api.password.postEmail, dummyEmail), dummyApiResponse],
      ])
      .call(api.password.postEmail, dummyEmail)
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to SUCCESS, when the saga completes without errors`, (): void => {
    const dummyAction = actions.apiPostEmailToPassword(dummyEmail);
    const dummyApiResponse = { status: 200 };

    return expectSaga(sagas.apiPostEmailToPassword, dummyAction)
      .provide([
        [call(api.password.postEmail, dummyEmail), dummyApiResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(a.API_POST_EMAIL_TO_PASSWORD))
      .put(apiRequestsStatus.actions.setSuccess(a.API_POST_EMAIL_TO_PASSWORD))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api call fails`, (): void => {
    const dummyAction = actions.apiPostEmailToPassword(dummyEmail);
    const dummyError = new Error('Boo!');

    return expectSaga(sagas.apiPostEmailToPassword, dummyAction)
      .provide({
        call(effect: any, next: any): any {
          if (effect.fn === api.password.postEmail) throw dummyError;
          else return next();
        },
      })
      .put(apiRequestsStatus.actions.setPending(a.API_POST_EMAIL_TO_PASSWORD))
      .put(apiRequestsStatus.actions.setFailure(a.API_POST_EMAIL_TO_PASSWORD, dummyError))
      .run();
  });

});
