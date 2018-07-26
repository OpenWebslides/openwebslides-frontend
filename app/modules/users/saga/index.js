// @flow

import { type Saga } from 'redux-saga';
import { all, call } from 'redux-saga/effects';

import apiSaga, { apiSagas } from './api';
import taskSaga, { taskSagas } from './task';

const saga = function* (): Saga<void> {
  yield all([
    call(apiSaga),
    call(taskSaga),
  ]);
};

const sagas = {
  ...apiSagas,
  ...taskSagas,
};

export { sagas };
export default saga;
