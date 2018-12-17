// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

import apiGet from './apiGet';
import apiPatch from './apiPatch';
import apiPost from './apiPost';

const { sagaWrapper } = asyncRequests.lib;

const apiSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.API_GET, sagaWrapper, apiGet),
    takeEvery(a.API_PATCH, sagaWrapper, apiPatch),
    takeEvery(a.API_POST, sagaWrapper, apiPost),
  ]);
};

const apiSagas = {
  apiGet,
  apiPatch,
  apiPost,
};

export { apiSagas };
export default apiSaga;
