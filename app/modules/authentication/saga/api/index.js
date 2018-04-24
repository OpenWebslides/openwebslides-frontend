// @flow

import { all, takeLatest, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import apiPostTokenSaga from './token';
import signoutSaga from './signout';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeLatest(t.API_POST_TOKEN, apiPostTokenSaga),
    takeEvery(t.SIGNOUT, signoutSaga),
  ]);
};

export default apiSaga;
