// @flow

import { all, call } from 'redux-saga/effects';

import apiSaga, { apiSagas } from './api';
import taskSaga, { taskSagas } from './task';

const saga = function* (): Generator<*, *, *> {
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
