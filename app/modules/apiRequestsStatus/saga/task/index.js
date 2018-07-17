// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import setFailure from './setFailure';
import setPending from './setPending';
import setSuccess from './setSuccess';

const taskSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(t.SET_FAILURE, setFailure),
    takeEvery(t.SET_PENDING, setPending),
    takeEvery(t.SET_SUCCESS, setSuccess),
  ]);
};

const taskSagas = {
  setFailure,
  setPending,
  setSuccess,
};

export { taskSagas };
export default taskSaga;
