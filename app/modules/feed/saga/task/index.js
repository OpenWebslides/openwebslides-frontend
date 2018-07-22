// @flow

import { all, takeLatest } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import fetchSaga from './fetch';

const taskSaga = function* (): Generator<*, *, *> {
  yield all([
    takeLatest(a.FETCH, fetchSaga),
  ]);
};

export default taskSaga;
