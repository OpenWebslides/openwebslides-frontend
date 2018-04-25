// @flow

import { expectSaga } from 'redux-saga-test-plan';

import taskSaga from '..';
import fetchSaga from '../fetch';

import * as t from '../../../actionTypes';

describe(`taskSaga`, (): void => {
  it(`takes every FETCH action and forks fetchSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.FETCH, fetchSaga)
      .silentRun();
  });
});
