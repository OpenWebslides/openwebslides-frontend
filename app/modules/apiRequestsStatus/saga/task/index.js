// @flow

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import setFailure from './setFailure';
import setPending from './setPending';
import setSuccess from './setSuccess';

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.SET_FAILURE, setFailure),
    takeEvery(a.SET_PENDING, setPending),
    takeEvery(a.SET_SUCCESS, setSuccess),
  ]);
};

const taskSagas = {
  setFailure,
  setPending,
  setSuccess,
};

export { taskSagas };
export default taskSaga;
