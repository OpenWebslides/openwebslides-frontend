// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

import apiGetAllByTopicId from './apiGetAllByTopicId';
import apiPatchAllByTopicIdAndRoot from './apiPatchAllByTopicIdAndRoot';

const { sagaWrapper } = asyncRequests.lib;

const apiSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.API_GET_ALL_BY_TOPIC_ID, sagaWrapper, apiGetAllByTopicId),
    takeEvery(a.API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT, sagaWrapper, apiPatchAllByTopicIdAndRoot),
  ]);
};

const apiSagas = {
  apiGetAllByTopicId,
  apiPatchAllByTopicIdAndRoot,
};

export { apiSagas };
export default apiSaga;
