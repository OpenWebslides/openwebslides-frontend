// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import actions from '../../actions';
import * as t from '../../actionTypes';

import { sagas } from '..';

describe(`apiPostConfirmation`, (): void => {

  let dummyToken: string;

  beforeEach((): void => {
    dummyToken = 'foobarToken';
  });

  it(`executes a post request to the confirmation API endpoint`, (): void => {
    const dummyAction = actions.apiPostConfirmation(dummyToken);
    const dummyApiResponse = { status: 200 };

    return expectSaga(sagas.apiPostConfirmation, dummyAction)
      .provide([
        [call(api.confirmation.post, dummyToken), dummyApiResponse],
      ])
      .call(api.confirmation.post, dummyToken)
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to SUCCESS, when the saga completes without errors`, (): void => {
    const dummyAction = actions.apiPostConfirmation(dummyToken);
    const dummyApiResponse = { status: 200 };

    return expectSaga(sagas.apiPostConfirmation, dummyAction)
      .provide([
        [call(api.confirmation.post, dummyToken), dummyApiResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(t.API_POST_CONFIRMATION))
      .put(apiRequestsStatus.actions.setSuccess(t.API_POST_CONFIRMATION))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api call fails`, (): void => {
    const dummyAction = actions.apiPostConfirmation(dummyToken);
    const dummyError = new Error('Boo!');

    return expectSaga(sagas.apiPostConfirmation, dummyAction)
      .provide({
        call(effect: any, next: any): any {
          if (effect.fn === api.confirmation.post) throw dummyError;
          else return next();
        },
      })
      .put(apiRequestsStatus.actions.setPending(t.API_POST_CONFIRMATION))
      .put(apiRequestsStatus.actions.setFailure(t.API_POST_CONFIRMATION, dummyError))
      .run();
  });

});
