// @flow

import { advanceTo } from 'jest-date-mock';
import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';
import * as m from '../../model';

import { taskSagas } from '.';

describe(`setPendingSaga`, (): void => {

  let dummyTimestamp: number;

  beforeEach((): void => {
    dummyTimestamp = 123456789;
    advanceTo(dummyTimestamp);
  });

  it(`puts a SET_IN_STATE with a PendingAsyncRequest containing the passed arguments`, (): void => {
    const dummyId = 'foobar';
    const dummyAction = actions.setPending(dummyId);

    return expectSaga(taskSagas.setPending, dummyAction)
      .put(actions.setAndClearOldInState({ id: dummyId, status: m.statusTypes.PENDING, timestamp: dummyTimestamp }))
      .run();
  });

});
