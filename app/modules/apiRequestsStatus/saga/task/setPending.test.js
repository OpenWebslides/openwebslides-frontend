// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';
import * as m from '../../model';

import { taskSagas } from '.';

describe(`setPendingSaga`, (): void => {

  it(`puts a SET_STATUS_IN_STATE_ACTION containing the passed arguments`, (): void => {
    const dummyRequestId = 'foobar';
    const dummyAction = actions.setPending(dummyRequestId);

    return expectSaga(taskSagas.setPending, dummyAction)
      .put(actions.setStatusInState(dummyRequestId, { status: m.statusTypes.PENDING }))
      .run();
  });

});
