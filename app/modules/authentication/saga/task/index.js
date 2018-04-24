// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import signinEmailSaga from './signinEmail';
import signoutSaga from './signout';
import signupSaga from './signup';
import resetSaga from './reset';

const taskSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(t.SIGNIN_EMAIL, signinEmailSaga),
    takeEvery(t.SIGNOUT, signoutSaga),
    takeEvery(t.SIGNUP, signupSaga),
    takeEvery(t.RESET, resetSaga),
  ]);
};

export default taskSaga;
