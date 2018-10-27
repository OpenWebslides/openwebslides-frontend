// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';
import * as m from '../../model';

import lib from '..';

describe(`putAndReturn`, (): void => {

  let dummyId: string;
  let dummyValue: string;
  let dummyError: Error;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyValue = 'dummyValue';
    dummyError = new Error('dummy');
    lib.generateId = jest.fn((): string => dummyId);
  });

  it(`puts the passed action, waits until a matching setSuccess action dispatched, and returns its value`, (): void => {
    const dummyAction = { type: 'dummy' };
    const dummyNotMatchingTypeAction = actions.setAndClearOldInState({ id: dummyId, status: m.statusTypes.SUCCESS, timestamp: 123456789, value: null });
    const dummyNotMatchingStatusAction = actions.setPending(dummyId);
    const dummyNotMatchingIdAction = actions.setSuccess('notMatchingId', null);
    const dummyMatchingAction = actions.setSuccess(dummyId, dummyValue);

    return expectSaga(lib.putAndReturn, dummyAction)
      .put({ ...dummyAction, asyncRequestData: { id: dummyId, log: false } })
      .dispatch(dummyNotMatchingTypeAction)
      .dispatch(dummyNotMatchingStatusAction)
      .dispatch(dummyNotMatchingIdAction)
      .dispatch(dummyMatchingAction)
      .returns(dummyValue)
      .run();
  });

  it(`puts the passed action, waits until a matching setFailure action dispatched, and re-throws the error`, async (): Promise<mixed> => {
    const dummyAction = { type: 'dummy' };
    const dummyNotMatchingTypeAction = actions.setAndClearOldInState({ id: dummyId, status: m.statusTypes.FAILURE, timestamp: 123456789, error: dummyError });
    const dummyNotMatchingStatusAction = actions.setPending(dummyId);
    const dummyNotMatchingIdAction = actions.setFailure('notMatchingId', dummyError);
    const dummyMatchingAction = actions.setFailure(dummyId, dummyError);

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(lib.putAndReturn, dummyAction)
        .put({ ...dummyAction, asyncRequestData: { id: dummyId, log: false } })
        .dispatch(dummyNotMatchingTypeAction)
        .dispatch(dummyNotMatchingStatusAction)
        .dispatch(dummyNotMatchingIdAction)
        .dispatch(dummyMatchingAction)
        .run(),
    ).rejects.toStrictEqual(dummyError);
  });

  it(`uses the original asyncRequestData instead of generating a random one, if the passed action has asyncRequestData`, (): void => {
    const dummyAction = { type: 'dummy', asyncRequestData: { id: 'dummyPassedId', log: true } };

    return expectSaga(lib.putAndReturn, dummyAction)
      .put(dummyAction)
      .dispatch(actions.setSuccess(dummyAction.asyncRequestData.id, dummyValue))
      .returns(dummyValue)
      .run();
  });

});
