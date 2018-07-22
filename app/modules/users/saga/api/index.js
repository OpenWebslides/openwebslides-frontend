// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import { apiGetUserSaga, apiPostUserSaga } from './users';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(a.API_GET_USER, apiGetUserSaga),
    takeEvery(a.API_POST_USER, apiPostUserSaga),
  ]);
};

export default apiSaga;
