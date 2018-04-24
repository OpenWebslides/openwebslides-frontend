// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import signinEmailSaga from './signinEmail';
import signoutSaga from './signout';

const taskSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(t.SIGNIN_EMAIL, signinEmailSaga),
    takeEvery(t.SIGNOUT, signoutSaga),
  ]);
};

export default taskSaga;
