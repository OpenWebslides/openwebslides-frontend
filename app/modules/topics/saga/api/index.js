// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

import apiDelete from './apiDelete';
import apiGet from './apiGet';
import apiPost from './apiPost';

const apiSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.API_DELETE, asyncRequests.lib.sagaWrapper, apiDelete),
    takeEvery(a.API_GET, asyncRequests.lib.sagaWrapper, apiGet),
    takeEvery(a.API_POST, asyncRequests.lib.sagaWrapper, apiPost),
  ]);
};

const apiSagas = {
  apiDelete,
  apiGet,
  apiPost,
};

export { apiSagas };
export default apiSaga;
