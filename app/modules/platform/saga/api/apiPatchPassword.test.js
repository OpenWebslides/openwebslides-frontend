// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`apiPatchPassword`, (): void => {

  let dummyPassword: string;
  let dummyToken: string;

  beforeEach((): void => {
    dummyPassword = 'P@ssword1';
    dummyToken = 'foobarToken';
  });

  it(`executes a patch request to the password API endpoint`, (): void => {
    const dummyAction = actions.apiPatchPassword(dummyPassword, dummyToken);
    const dummyApiResponse = { status: 200 };

    return expectSaga(sagas.apiPatchPassword, dummyAction)
      .provide([
        [call(api.password.patch, dummyPassword, dummyToken), dummyApiResponse],
      ])
      .call(api.password.patch, dummyPassword, dummyToken)
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to SUCCESS, when the saga completes without errors`, (): void => {
    const dummyAction = actions.apiPatchPassword(dummyPassword, dummyToken);
    const dummyApiResponse = { status: 200 };

    return expectSaga(sagas.apiPatchPassword, dummyAction)
      .provide([
        [call(api.password.patch, dummyPassword, dummyToken), dummyApiResponse],
      ])
      .put(asyncRequests.actions.setPending(a.API_PATCH_PASSWORD))
      .put(asyncRequests.actions.setSuccess(a.API_PATCH_PASSWORD))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api call fails`, (): void => {
    const dummyAction = actions.apiPatchPassword(dummyPassword, dummyToken);
    const dummyError = new Error('Boo!');

    return expectSaga(sagas.apiPatchPassword, dummyAction)
      .provide({
        call(effect: any, next: any): any {
          if (effect.fn === api.password.patch) throw dummyError;
          else return next();
        },
      })
      .put(asyncRequests.actions.setPending(a.API_PATCH_PASSWORD))
      .put(asyncRequests.actions.setFailure(a.API_PATCH_PASSWORD, dummyError))
      .run();
  });

});
