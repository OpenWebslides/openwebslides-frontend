// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import { type ApiToken } from 'lib/ApiRequest';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import actions from '../../actions';
import * as t from '../../actionTypes';

import { sagas } from '..';

describe(`apiDeleteToken`, (): void => {

  let dummyToken: ApiToken;

  beforeEach((): void => {
    dummyToken = 'foobarToken';
  });

  it(`selects the current user's token from the state and executes a delete request for this token to the token API endpoint`, (): void => {
    const dummyAction = actions.apiDeleteToken(dummyToken);
    const dummyApiResponse = { status: 200 };

    return expectSaga(sagas.apiDeleteToken, dummyAction)
      .provide([
        [call(api.token.delete, dummyToken), dummyApiResponse],
      ])
      .call(api.token.delete, dummyToken)
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to SUCCESS, when the saga completes without errors`, (): void => {
    const dummyAction = actions.apiDeleteToken(dummyToken);
    const dummyApiResponse = { status: 200 };

    return expectSaga(sagas.apiDeleteToken, dummyAction)
      .provide([
        [call(api.token.delete, dummyToken), dummyApiResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(t.API_DELETE_TOKEN))
      .put(apiRequestsStatus.actions.setSuccess(t.API_DELETE_TOKEN))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api call fails`, (): void => {
    const dummyAction = actions.apiDeleteToken(dummyToken);
    const dummyError = new Error('Boo!');

    return expectSaga(sagas.apiDeleteToken, dummyAction)
      .provide({
        call(effect: any, next: any): any {
          if (effect.fn === api.token.delete) throw dummyError;
          else return next();
        },
      })
      .put(apiRequestsStatus.actions.setPending(t.API_DELETE_TOKEN))
      .put(apiRequestsStatus.actions.setFailure(t.API_DELETE_TOKEN, dummyError))
      .run();
  });

});
