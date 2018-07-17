// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import { apiGetUserSaga, apiPostUserSaga } from './users';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(t.API_GET_USER, apiGetUserSaga),
    takeEvery(t.API_POST_USER, apiPostUserSaga),
  ]);
};

export default apiSaga;
