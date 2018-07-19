// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import actions from '../../actions';
import * as t from '../../actionTypes';

import { sagas } from '..';

describe(`apiPostPassword`, (): void => {

  let dummyEmail: string;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
  });

  it(`executes a post request for the passed email to the password API endpoint`, (): void => {
    const dummyAction = actions.apiPostPassword(dummyEmail);
    const dummyApiResponse = { status: 200 };

    return expectSaga(sagas.apiPostPassword, dummyAction)
      .provide([
        [call(api.password.postEmail, dummyEmail), dummyApiResponse],
      ])
      .call(api.password.postEmail, dummyEmail)
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to SUCCESS, when the saga completes without errors`, (): void => {
    const dummyAction = actions.apiPostPassword(dummyEmail);
    const dummyApiResponse = { status: 200 };

    return expectSaga(sagas.apiPostPassword, dummyAction)
      .provide([
        [call(api.password.postEmail, dummyEmail), dummyApiResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(t.API_POST_PASSWORD))
      .put(apiRequestsStatus.actions.setSuccess(t.API_POST_PASSWORD))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api call fails`, (): void => {
    const dummyAction = actions.apiPostPassword(dummyEmail);
    const dummyError = new Error('Boo!');

    return expectSaga(sagas.apiPostPassword, dummyAction)
      .provide({
        call(effect: any, next: any): any {
          if (effect.fn === api.password.postEmail) throw dummyError;
          else return next();
        },
      })
      .put(apiRequestsStatus.actions.setPending(t.API_POST_PASSWORD))
      .put(apiRequestsStatus.actions.setFailure(t.API_POST_PASSWORD, dummyError))
      .run();
  });

});
