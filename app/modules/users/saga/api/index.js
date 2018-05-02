// @flow

import { all, takeLatest } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import { apiGetUserSaga } from './users';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeLatest(t.API_GET_USER, apiGetUserSaga),
  ]);
};

export default apiSaga;
