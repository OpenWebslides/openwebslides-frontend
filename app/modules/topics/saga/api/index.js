// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

import apiDelete from './apiDelete';
import apiGet from './apiGet';
import apiPost from './apiPost';
import apiPostFork from './apiPostFork';

const { sagaWrapper } = asyncRequests.lib;

const apiSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.API_DELETE, sagaWrapper, apiDelete),
    takeEvery(a.API_GET, sagaWrapper, apiGet),
    takeEvery(a.API_POST, sagaWrapper, apiPost),
    takeEvery(a.API_POST_FORK, sagaWrapper, apiPostFork),
  ]);
};

const apiSagas = {
  apiDelete,
  apiGet,
  apiPost,
  apiPostFork,
};

export { apiSagas };
export default apiSaga;
