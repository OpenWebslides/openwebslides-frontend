// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';


import removeSaga from './remove';

const taskSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(t.REMOVE, removeSaga),
  ]);
};

export default taskSaga;
