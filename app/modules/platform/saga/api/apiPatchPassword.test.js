// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';

import actions from '../../actions';

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

});
