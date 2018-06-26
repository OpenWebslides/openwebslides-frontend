// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import redirectSaga from './redirect';

const taskSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(t.REDIRECT, redirectSaga),
  ]);
};

export default taskSaga;
