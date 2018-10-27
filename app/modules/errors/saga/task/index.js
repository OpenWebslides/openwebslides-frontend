// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import log from './log';

// Note: these should not use asyncRequests.lib.sagaWrapper
// because they're dispatched from inside sagaWrapper.
const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.LOG, log),
  ]);
};

const taskSagas = {
  log,
};

export { taskSagas };
export default taskSaga;
