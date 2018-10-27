// @flow

import { advanceTo } from 'jest-date-mock';
import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';
import * as m from '../../model';

import { taskSagas } from '.';

describe(`setFailureSaga`, (): void => {

  let dummyTimestamp: number;

  beforeEach((): void => {
    dummyTimestamp = 123456789;
    advanceTo(dummyTimestamp);
  });

  it(`puts a SET_IN_STATE with a FailureAsyncRequest containing the passed arguments and logs the passed error`, (): void => {
    const dummyId = 'foobar';
    const dummyError = new Error('dummyMessage');
    const dummyAction = actions.setFailure(dummyId, dummyError);

    return expectSaga(taskSagas.setFailure, dummyAction)
      .put(actions.setAndClearOldInState({ id: dummyId, status: m.statusTypes.FAILURE, timestamp: dummyTimestamp, error: dummyError }))
      .run();
  });

});
