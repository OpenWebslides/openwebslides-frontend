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
    takeLatest(t.API_DELETE, apiDeleteTopicSaga),
    takeEvery(t.API_GET, apiGetTopicSaga),
    takeLatest(t.API_GET_ALL_BY_USERID, apiGetAllTopicsByUserIdSaga),
    takeLatest(t.API_POST, apiPostTopicSaga),
    takeLatest(t.API_PATCH_CONTENT, apiPatchTopicContentSaga),
    takeLatest(t.API_GET_CONTENT, apiGetTopicContentSaga),
  ]);
};

export default apiSaga;
