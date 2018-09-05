// @flow

/* eslint-disable sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import apiGetAll from './apiGetAll';

const apiSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.API_GET_ALL, apiGetAll),
  ]);
};

const apiSagas = {
  apiGetAll,
};

export { apiSagas };
export default apiSaga;
