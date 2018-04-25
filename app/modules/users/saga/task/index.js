// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import getSaga from './get';

const taskSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(t.GET, getSaga),
  ]);
};

export default taskSaga;
