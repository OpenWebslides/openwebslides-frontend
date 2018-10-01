// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';

import actions from '../../actions';

import { sagas } from '..';

describe(`apiPost`, (): void => {

  let dummyEmail: string;
  let dummyName: string;
  let dummyPassword: string;
  let dummyTosAccepted: boolean;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyName = 'Test Tester';
    dummyPassword = 'MahPasswordY0';
    dummyTosAccepted = true;
  });

  it(`sends a POST request with the passed props to the uses API endpoint`, (): void => {
    const dummyAction = actions.apiPost(dummyEmail, dummyName, dummyPassword, dummyTosAccepted);
    const dummyApiResponse = { status: 204 };

    return expectSaga(sagas.apiPost, dummyAction)
      .provide([
        [call(api.users.post, dummyEmail, dummyName, dummyPassword, dummyTosAccepted), dummyApiResponse],
      ])
      .call(api.users.post, dummyEmail, dummyName, dummyPassword, dummyTosAccepted)
      .run();
  });

});
