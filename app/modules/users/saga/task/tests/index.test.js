// @flow

import { expectSaga } from 'redux-saga-test-plan';

import taskSaga from '..';

import getSaga from '../get';
import * as a from '../../../actionTypes';

describe(`taskSaga`, (): void => {
  it(`takes every GET action and forks getSaga`, (): void => {
    return expectSaga(taskSaga)
      .take(a.GET, getSaga)
      .silentRun();
  });
});
