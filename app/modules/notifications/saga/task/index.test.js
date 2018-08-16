// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as a from '../../actionTypes';

import fetchSaga from './fetch';

import taskSaga from '..';

describe(`taskSaga`, (): void => {
  it(`takes every FETCH action and forks fetchSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(a.FETCH, fetchSaga)
      .silentRun();
  });
});
