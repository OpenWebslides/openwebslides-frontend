// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';
import * as m from '../../model';

import { taskSagas } from '.';

describe(`setSuccessSaga`, (): void => {

  it(`puts a SET_IN_STATE with a SuccessAsyncRequest containing the passed arguments`, (): void => {
    const dummyId = 'foobar';
    const dummyValue = { foo: 'bar' };
    const dummyAction = actions.setSuccess(dummyId, dummyValue);

    return expectSaga(taskSagas.setSuccess, dummyAction)
      .put(actions.setInState({ id: dummyId, status: m.statusTypes.SUCCESS, value: dummyValue }))
      .run();
  });

});
