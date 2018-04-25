// @flow

import { all, takeLatest } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import { apiGetUsersSaga } from './users';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeLatest(t.API_GET_USERS, apiGetUsersSaga),
  ]);
};

export default apiSaga;
