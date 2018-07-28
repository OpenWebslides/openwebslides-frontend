// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';

import { sagas } from '..';

describe(`resetPassword`, (): void => {

  let dummyPassword: string;
  let dummyResetPasswordToken: string;

  beforeEach((): void => {
    dummyResetPasswordToken = 'foobarToken';
    dummyPassword = 'P@ssword1';
  });

  it(`puts an apiPatchPassword action`, (): void => {
    const dummyAction = actions.resetPassword(dummyPassword, dummyResetPasswordToken);

    return expectSaga(sagas.resetPassword, dummyAction)
      .put(actions.apiPatchPassword(dummyPassword, dummyResetPasswordToken))
      .run();
  });

});
