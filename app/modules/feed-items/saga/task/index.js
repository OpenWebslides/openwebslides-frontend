// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import fetchSaga from './fetch';

const taskSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(t.FETCH, fetchSaga),
  ]);
};

export default taskSaga;
