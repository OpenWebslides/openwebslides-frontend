// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import fetch from './fetch';

const taskSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(a.FETCH, fetch),
  ]);
};

const taskSagas = {
  fetch,
};

export { taskSagas };
export default taskSaga;
