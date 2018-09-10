// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';

import actions from '../../actions';

import { sagas } from '..';

describe(`apiPostPassword`, (): void => {

  let dummyEmail: string;

  beforeEach((): void => {
    dummyEmail = 'foo@bar.com';
  });

  it(`executes a post request to the password API endpoint`, (): void => {
    const dummyAction = actions.apiPostPassword(dummyEmail);
    const dummyApiResponse = { status: 204 };

    return expectSaga(sagas.apiPostPassword, dummyAction)
      .provide([
        [call(api.password.post, dummyEmail), dummyApiResponse],
      ])
      .call(api.password.post, dummyEmail)
      .run();
  });

});
