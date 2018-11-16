// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

import apiGetAllByUserId from './apiGetAllByUserId';
import apiPatch from './apiPatch';

const { sagaWrapper } = asyncRequests.lib;

const apiSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.API_GET_ALL_BY_USER_ID, sagaWrapper, apiGetAllByUserId),
    takeEvery(a.API_PATCH, sagaWrapper, apiPatch),
  ]);
};

const apiSagas = {
  apiGetAllByUserId,
  apiPatch,
};

export { apiSagas };
export default apiSaga;
