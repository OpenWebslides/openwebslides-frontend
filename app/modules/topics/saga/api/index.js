// @flow

import { all, takeLatest, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import { apiDeleteTopicSaga } from './delete';
import { apiGetAllTopicsByUserIdSaga, apiGetTopicSaga } from './get';
import { apiPostTopicSaga } from './post';
import { apiPatchTopicContentSaga } from './patchContent';
import { apiGetTopicContentSaga } from './getContent';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeLatest(t.API_DELETE_TOPIC, apiDeleteTopicSaga),
    takeEvery(t.API_GET_TOPIC, apiGetTopicSaga),
    takeLatest(t.API_GET_ALL_TOPICS_BY_USERID, apiGetAllTopicsByUserIdSaga),
    takeLatest(t.API_POST_TOPIC, apiPostTopicSaga),
    takeLatest(t.API_PATCH_TOPIC_CONTENT, apiPatchTopicContentSaga),
    takeLatest(t.API_GET_TOPIC_CONTENT, apiGetTopicContentSaga),
  ]);
};

export default apiSaga;
