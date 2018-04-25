// @flow

import { all, takeLatest } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import { apiGetTopicsSaga } from './get';
import { apiPostTopicSaga } from './post';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeLatest(t.API_GET_TOPICS, apiGetTopicsSaga),
    takeLatest(t.API_POST_TOPIC, apiPostTopicSaga),
  ]);
};

export default apiSaga;
