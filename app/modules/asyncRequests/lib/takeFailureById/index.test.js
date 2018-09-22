// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';
import * as m from '../../model';

import lib from '..';

describe(`takeFailureById`, (): void => {

  let dummyId: string;
  let dummyError: Error;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyError = new Error('dummy');
  });

  it(`waits until a setFailure action containing the requested ID is dispatched and returns its error`, (): void => {
    const dummyNotMatchingTypeAction = actions.setInState({ id: dummyId, status: m.statusTypes.FAILURE, error: new Error() });
    const dummyNotMatchingIdAction = actions.setFailure('notMatchingId', new Error());
    const dummyMatchingAction = actions.setFailure(dummyId, dummyError);

    return expectSaga(lib.takeFailureById, dummyId)
      .dispatch(dummyNotMatchingTypeAction)
      .dispatch(dummyNotMatchingIdAction)
      .dispatch(dummyMatchingAction)
      .returns(dummyError)
      .run();
  });

});
