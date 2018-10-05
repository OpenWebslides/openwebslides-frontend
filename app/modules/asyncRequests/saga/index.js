// @flow

/* eslint-disable sort-imports */

import { type Saga } from 'redux-saga';
import { all, call } from 'redux-saga/effects';

import taskSaga from './task';

const saga = function* (): Saga<void> {
  yield all([
    // Note: apiSaga should never be necessary for this module.
    call(taskSaga),
  ]);
};

export default saga;
