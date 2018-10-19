// @flow

import { expectSaga } from 'redux-saga-test-plan';

import taskSaga from './task';

import saga from '.';

describe(`saga`, (): void => {

  it(`yields a call to taskSaga`, (): void => {
    return expectSaga(saga)
      .call(taskSaga)
      .silentRun();
  });

});
