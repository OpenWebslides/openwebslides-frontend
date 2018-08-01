// @flow

/* eslint-disable sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import apiGet from './apiGet';
import apiPost from './apiPost';

const apiSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.API_GET, apiGet),
    takeEvery(a.API_POST, apiPost),
  ]);
};

const apiSagas = {
  apiGet,
  apiPost,
};

export { apiSagas };
export default apiSaga;
