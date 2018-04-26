// @flow

import { expectSaga } from 'redux-saga-test-plan';

import taskSaga from '..';
import getSaga from '../get';

import * as t from '../../../actionTypes';

describe(`taskSaga`, (): void => {
  it(`takes every GET action and forks getSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(t.GET, getSaga)
      .silentRun();
  });
});
