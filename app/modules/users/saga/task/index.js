// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import getSaga from './get';

const taskSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(a.GET, getSaga),
  ]);
};

export default taskSaga;
