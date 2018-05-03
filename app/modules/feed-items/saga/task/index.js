// @flow

import { all, takeLatest } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import fetchSaga from './fetch';

const taskSaga = function* (): Generator<*, *, *> {
  yield all([
    takeLatest(t.FETCH, fetchSaga),
  ]);
};

export default taskSaga;
