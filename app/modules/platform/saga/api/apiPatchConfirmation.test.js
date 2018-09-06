// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`apiPatchConfirmation`, (): void => {

  let dummyToken: string;

  beforeEach((): void => {
    dummyToken = 'foobarToken';
  });

  it(`executes a patch request to the confirmation API endpoint`, (): void => {
    const dummyAction = actions.apiPatchConfirmation(dummyToken);
    const dummyApiResponse = { status: 200 };

    return expectSaga(sagas.apiPatchConfirmation, dummyAction)
      .provide([
        [call(api.confirmation.patch, dummyToken), dummyApiResponse],
      ])
      .call(api.confirmation.patch, dummyToken)
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to SUCCESS, when the saga completes without errors`, (): void => {
    const dummyAction = actions.apiPatchConfirmation(dummyToken);
    const dummyApiResponse = { status: 200 };

    return expectSaga(sagas.apiPatchConfirmation, dummyAction)
      .provide([
        [call(api.confirmation.patch, dummyToken), dummyApiResponse],
      ])
      .put(asyncRequests.actions.setPending(a.API_PATCH_CONFIRMATION))
      .put(asyncRequests.actions.setSuccess(a.API_PATCH_CONFIRMATION))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api call fails`, (): void => {
    const dummyAction = actions.apiPatchConfirmation(dummyToken);
    const dummyError = new Error('Boo!');

    return expectSaga(sagas.apiPatchConfirmation, dummyAction)
      .provide({
        call(effect: any, next: any): any {
          if (effect.fn === api.confirmation.patch) throw dummyError;
          else return next();
        },
      })
      .put(asyncRequests.actions.setPending(a.API_PATCH_CONFIRMATION))
      .put(asyncRequests.actions.setFailure(a.API_PATCH_CONFIRMATION, dummyError))
      .run();
  });

});
