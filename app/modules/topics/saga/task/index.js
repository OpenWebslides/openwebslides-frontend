// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';


import addSaga from './add';
import removeSaga from './remove';

const taskSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(t.ADD, addSaga),
    takeEvery(t.REMOVE, removeSaga),
  ]);
};

export default taskSaga;
