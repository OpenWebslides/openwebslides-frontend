// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`apiPost`, (): void => {

  let dummyEmail: string;
  let dummyFirstName: string;
  let dummyLastName: string;
  let dummyPassword: string;
  let dummyTosAccepted: boolean;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyFirstName = 'Test';
    dummyLastName = 'Tester';
    dummyPassword = 'MahPasswordY0';
    dummyTosAccepted = true;
  });

  it(`sends a POST request with the passed props to the uses API endpoint`, (): void => {
    const dummyAction = actions.apiPost(dummyEmail, dummyFirstName, dummyLastName, dummyPassword, dummyTosAccepted);
    const dummyApiResponse = { status: 204 };

    return expectSaga(sagas.apiPost, dummyAction)
      .provide([
        [call(api.users.post, dummyEmail, dummyFirstName, dummyLastName, dummyPassword, dummyTosAccepted), dummyApiResponse],
      ])
      .call(api.users.post, dummyEmail, dummyFirstName, dummyLastName, dummyPassword, dummyTosAccepted)
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to SUCCESS, when the saga completes without errors`, (): void => {
    const dummyAction = actions.apiPost(dummyEmail, dummyFirstName, dummyLastName, dummyPassword, dummyTosAccepted);
    const dummyApiResponse = { status: 204 };

    return expectSaga(sagas.apiPost, dummyAction)
      .provide([
        [call(api.users.post, dummyEmail, dummyFirstName, dummyLastName, dummyPassword, dummyTosAccepted), dummyApiResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(a.API_POST))
      .put(apiRequestsStatus.actions.setSuccess(a.API_POST))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api call fails`, (): void => {
    const dummyAction = actions.apiPost(dummyEmail, dummyFirstName, dummyLastName, dummyPassword, dummyTosAccepted);
    const dummyError = new Error('Boo!');

    return expectSaga(sagas.apiPost, dummyAction)
      .provide({
        call({ fn }: any, next: any): any {
          if (fn === api.users.post) throw dummyError;
          else return next();
        },
      })
      .put(apiRequestsStatus.actions.setPending(a.API_POST))
      .put(apiRequestsStatus.actions.setFailure(a.API_POST, dummyError))
      .run();
  });

});
