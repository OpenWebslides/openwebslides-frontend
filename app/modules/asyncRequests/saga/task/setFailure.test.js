// @flow

import { expectSaga } from 'redux-saga-test-plan';

import errors from 'modules/errors';

import actions from '../../actions';
import * as m from '../../model';

import { taskSagas } from '.';

describe(`setFailureSaga`, (): void => {

  it(`puts a SET_IN_STATE with a FailureAsyncRequest containing the passed arguments and logs the passed error`, (): void => {
    const dummyId = 'foobar';
    const dummyError = new Error('dummyMessage');
    const dummyAction = actions.setFailure(dummyId, dummyError);

    return expectSaga(taskSagas.setFailure, dummyAction)
      .put(actions.setInState({ id: dummyId, status: m.statusTypes.FAILURE, error: dummyError }))
      .put(errors.actions.log(dummyError))
      .run();
  });

});
