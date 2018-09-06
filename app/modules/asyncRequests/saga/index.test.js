// @flow

import { expectSaga } from 'redux-saga-test-plan';

import apiSaga from './api';
import taskSaga from './task';

import saga from '.';

describe(`saga`, (): void => {

  it(`yields a call to apiSaga`, (): void => {
    return expectSaga(saga)
      .call(apiSaga)
      .silentRun();
  });

  it(`yields a call to taskSaga`, (): void => {
    return expectSaga(saga)
      .call(taskSaga)
      .silentRun();
  });

});
