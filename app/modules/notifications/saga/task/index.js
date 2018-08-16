// @flow

/* eslint-disable sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeLatest } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import fetchSaga from './fetch';

const taskSaga = function* (): Saga<void> {
  yield all([
    takeLatest(a.FETCH, fetchSaga),
  ]);
};

export default taskSaga;
