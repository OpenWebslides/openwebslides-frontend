// @flow

import { all, call } from 'redux-saga/effects';

import apiSaga from './api';
import taskSaga from './task';

const saga = function* (): Generator<*, *, *> {
  yield all([
    call(apiSaga),
    call(taskSaga),
  ]);
};

export default saga;
