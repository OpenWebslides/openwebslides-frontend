// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import signinEmailSaga from './signinEmail';

const taskSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(t.SIGNIN_EMAIL, signinEmailSaga),
  ]);
};

export default taskSaga;
