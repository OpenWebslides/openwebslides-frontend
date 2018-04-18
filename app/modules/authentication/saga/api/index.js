// @flow

import { all, takeLatest, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import signinEmailSaga from './signinEmail';
import signoutSaga from './signout';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeLatest(t.SIGNIN_EMAIL, signinEmailSaga),
    takeEvery(t.SIGNOUT, signoutSaga),
  ]);
};

export default apiSaga;
