// @flow

/* eslint-disable sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import apiGetAllByTopicId from './apiGetAllByTopicId';
import apiPatchAllByTopicIdAndRoot from './apiPatchAllByTopicIdAndRoot';

const apiSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.API_GET_ALL_BY_TOPIC_ID, apiGetAllByTopicId),
    takeEvery(a.API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT, apiPatchAllByTopicIdAndRoot),
  ]);
};

const apiSagas = {
  apiGetAllByTopicId,
  apiPatchAllByTopicIdAndRoot,
};

export { apiSagas };
export default apiSaga;
