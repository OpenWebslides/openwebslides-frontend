// @flow

import { all, takeLatest } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import { apiGetTopicsSaga } from './topics';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeLatest(t.API_GET_TOPICS, apiGetTopicsSaga),
  ]);
};

export default apiSaga;
