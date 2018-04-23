// @flow

import { all, takeLatest } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import fetchSaga from './fetch';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeLatest(t.FETCH_FEED, fetchSaga),
  ]);
};

export default apiSaga;
