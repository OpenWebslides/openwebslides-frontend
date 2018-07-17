// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';
import * as m from '../../model';

import { taskSagas } from '.';

describe(`setFailureSaga`, (): void => {

  it(`puts a SET_STATUS_IN_STATE_ACTION containing the passed arguments`, (): void => {
    const dummyRequestId = 'foobar';
    const dummyError = new Error('dummyMessage');
    const dummyAction = actions.setFailure(dummyRequestId, dummyError);

    return expectSaga(taskSagas.setFailure, dummyAction)
      .put(actions.setStatusInState(dummyRequestId, { status: m.statusTypes.FAILURE, error: dummyError }))
      .run();
  });

});
