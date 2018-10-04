// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

import apiDelete from './apiDelete';
import apiGet from './apiGet';
import apiPost from './apiPost';

const { sagaWrapper } = asyncRequests.lib;

const apiSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.API_DELETE, sagaWrapper, apiDelete),
    takeEvery(a.API_GET, sagaWrapper, apiGet),
    takeEvery(a.API_POST, sagaWrapper, apiPost),
  ]);
};

const apiSagas = {
  apiDelete,
  apiGet,
  apiPost,
};

export { apiSagas };
export default apiSaga;
