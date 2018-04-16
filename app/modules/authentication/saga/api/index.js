// @flow

import { all, takeLatest } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import signinEmailSaga from './signinEmail';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeLatest(t.SIGNIN_EMAIL, signinEmailSaga),
  ]);
};

export default apiSaga;
