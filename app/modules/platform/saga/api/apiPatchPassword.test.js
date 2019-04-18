// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';

import actions from '../../actions';

import { sagas } from '..';

describe(`apiPatchPassword`, (): void => {

  let dummyPassword: string;
  let dummyResetPasswordToken: string;

  beforeEach((): void => {
    dummyPassword = 'P@ssword1';
    dummyResetPasswordToken = 'dummyResetPasswordToken';
  });

  it(`executes a patch request to the password API endpoint`, (): void => {
    const dummyAction = actions.apiPatchPassword(dummyPassword, dummyResetPasswordToken);
    const dummyApiResponse = { status: 200 };

    return expectSaga(sagas.apiPatchPassword, dummyAction)
      .provide([
        [call(api.password.patch, dummyPassword, dummyResetPasswordToken), dummyApiResponse],
      ])
      .call(api.password.patch, dummyPassword, dummyResetPasswordToken)
      .run();
  });

});
