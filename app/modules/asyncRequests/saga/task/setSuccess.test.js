// @flow

import { advanceTo } from 'jest-date-mock';
import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';
import * as m from '../../model';

import { taskSagas } from '.';

describe(`setSuccessSaga`, (): void => {

  let dummyTimestamp: number;

  beforeEach((): void => {
    dummyTimestamp = 123456789;
    advanceTo(dummyTimestamp);
  });

  it(`puts a SET_IN_STATE with a SuccessAsyncRequest containing the passed arguments`, (): void => {
    const dummyId = 'foobar';
    const dummyValue = { foo: 'bar' };
    const dummyAction = actions.setSuccess(dummyId, dummyValue);

    return expectSaga(taskSagas.setSuccess, dummyAction)
      .put(actions.setAndClearOldInState({ id: dummyId, status: m.statusTypes.SUCCESS, timestamp: dummyTimestamp, value: dummyValue }))
      .run();
  });

});
