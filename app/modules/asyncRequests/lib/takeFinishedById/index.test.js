// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';
import * as m from '../../model';

import lib from '..';

describe(`takeFinishedById`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`waits until a setSuccess action containing the requested ID is dispatched and returns it`, (): void => {
    const dummyNotMatchingTypeAction = actions.setInState({ id: dummyId, status: m.statusTypes.SUCCESS, value: null });
    const dummyNotMatchingStatusAction = actions.setPending(dummyId);
    const dummyNotMatchingIdAction = actions.setSuccess('notMatchingId', null);
    const dummyMatchingAction = actions.setSuccess(dummyId, null);

    return expectSaga(lib.takeFinishedById, dummyId)
      .dispatch(dummyNotMatchingTypeAction)
      .dispatch(dummyNotMatchingStatusAction)
      .dispatch(dummyNotMatchingIdAction)
      .dispatch(dummyMatchingAction)
      .returns(dummyMatchingAction)
      .run();
  });

  it(`waits until a setFailure action containing the requested ID is dispatched and returns it`, (): void => {
    const dummyError = new Error('dummy');
    const dummyNotMatchingTypeAction = actions.setInState({ id: dummyId, status: m.statusTypes.FAILURE, error: dummyError });
    const dummyNotMatchingStatusAction = actions.setPending(dummyId);
    const dummyNotMatchingIdAction = actions.setFailure('notMatchingId', dummyError);
    const dummyMatchingAction = actions.setFailure(dummyId, dummyError);

    return expectSaga(lib.takeFinishedById, dummyId)
      .dispatch(dummyNotMatchingTypeAction)
      .dispatch(dummyNotMatchingStatusAction)
      .dispatch(dummyNotMatchingIdAction)
      .dispatch(dummyMatchingAction)
      .returns(dummyMatchingAction)
      .run();
  });

});
