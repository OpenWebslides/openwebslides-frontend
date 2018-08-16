// @flow

/* eslint-disable sort-imports */

import { type Saga } from 'redux-saga';
import { all, call } from 'redux-saga/effects';

import apiSaga from './api';
import taskSaga from './task';

const saga = function* (): Saga<void> {
  yield all([
    call(apiSaga),
    call(taskSaga),
  ]);
};

export default saga;
