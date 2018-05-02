// @flow

import { all, takeLatest } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import { apiDeleteTopicSaga } from './delete';
import { apiGetAllTopicsSaga, apiGetTopicSaga } from './get';
import { apiPostTopicSaga } from './post';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeLatest(t.API_DELETE_TOPIC, apiDeleteTopicSaga),
    takeLatest(t.API_GET_TOPIC, apiGetTopicSaga),
    takeLatest(t.API_GET_ALL_TOPICS, apiGetAllTopicsSaga),
    takeLatest(t.API_POST_TOPIC, apiPostTopicSaga),
  ]);
};

export default apiSaga;
