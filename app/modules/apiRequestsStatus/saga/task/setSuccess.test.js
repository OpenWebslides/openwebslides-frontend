// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';
import * as m from '../../model';

import { taskSagas } from '.';

describe(`setSuccessSaga`, (): void => {

  it(`puts a SET_STATUS_IN_STATE_ACTION containing the passed arguments`, (): void => {
    const dummyRequestId = 'foobar';
    const dummyValue = { foo: 'bar' };
    const dummyAction = actions.setSuccess(dummyRequestId, dummyValue);

    return expectSaga(taskSagas.setSuccess, dummyAction)
      .put(actions.setStatusInState(dummyRequestId, { status: m.statusTypes.SUCCESS, value: dummyValue }))
      .run();
  });

});
