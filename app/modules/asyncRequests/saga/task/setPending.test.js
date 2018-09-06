// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';
import * as m from '../../model';

import { taskSagas } from '.';

describe(`setPendingSaga`, (): void => {

  it(`puts a SET_IN_STATE with a PendingAsyncRequest containing the passed arguments`, (): void => {
    const dummyId = 'foobar';
    const dummyAction = actions.setPending(dummyId);

    return expectSaga(taskSagas.setPending, dummyAction)
      .put(actions.setInState({ id: dummyId, status: m.statusTypes.PENDING }))
      .run();
  });

});
