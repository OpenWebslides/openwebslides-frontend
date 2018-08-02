// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`apiPostConfirmation`, (): void => {

  let dummyEmail: string;

  beforeEach((): void => {
    dummyEmail = 'foo@bar.com';
  });

  it(`executes a post request to the confirmation API endpoint`, (): void => {
    const dummyAction = actions.apiPostConfirmation(dummyEmail);
    const dummyApiResponse = { status: 204 };

    return expectSaga(sagas.apiPostConfirmation, dummyAction)
      .provide([
        [call(api.confirmation.post, dummyEmail), dummyApiResponse],
      ])
      .call(api.confirmation.post, dummyEmail)
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to SUCCESS, when the saga completes without errors`, (): void => {
    const dummyAction = actions.apiPostConfirmation(dummyEmail);
    const dummyApiResponse = { status: 200 };

    return expectSaga(sagas.apiPostConfirmation, dummyAction)
      .provide([
        [call(api.confirmation.post, dummyEmail), dummyApiResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(a.API_POST_CONFIRMATION))
      .put(apiRequestsStatus.actions.setSuccess(a.API_POST_CONFIRMATION))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api call fails`, (): void => {
    const dummyAction = actions.apiPostConfirmation(dummyEmail);
    const dummyError = new Error('Boo!');

    return expectSaga(sagas.apiPostConfirmation, dummyAction)
      .provide({
        call(effect: any, next: any): any {
          if (effect.fn === api.confirmation.post) throw dummyError;
          else return next();
        },
      })
      .put(apiRequestsStatus.actions.setPending(a.API_POST_CONFIRMATION))
      .put(apiRequestsStatus.actions.setFailure(a.API_POST_CONFIRMATION, dummyError))
      .run();
  });

});
