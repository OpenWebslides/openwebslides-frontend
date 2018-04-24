// @flow

import { expectSaga } from 'redux-saga-test-plan';

import taskSaga from '..';
import signinEmailSaga from '../signinEmail';
import signoutSaga from '../signout';
import resetSaga from '../reset';

import * as t from '../../../actionTypes';

describe(`taskSaga`, (): void => {
  it(`takes every SIGNIN_EMAIL action and forks signinEmailSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.SIGNIN_EMAIL, signinEmailSaga)
      .silentRun();
  });

  it(`takes every SIGNOUT action and forks signoutSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.SIGNOUT, signoutSaga)
      .silentRun();
  });

  it(`takes every RESET action and forks resetSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.RESET, resetSaga)
      .silentRun();
  });
});
