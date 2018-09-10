// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequestSagaWrapper from 'lib/asyncRequestSagaWrapper';

import * as a from '../../actionTypes';

import apiDelete from './apiDelete';
import apiGet from './apiGet';
import apiPost from './apiPost';

const apiSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.API_DELETE, asyncRequestSagaWrapper, apiDelete),
    takeEvery(a.API_GET, asyncRequestSagaWrapper, apiGet),
    takeEvery(a.API_POST, asyncRequestSagaWrapper, apiPost),
  ]);
};

const apiSagas = {
  apiDelete,
  apiGet,
  apiPost,
};

export { apiSagas };
export default apiSaga;
