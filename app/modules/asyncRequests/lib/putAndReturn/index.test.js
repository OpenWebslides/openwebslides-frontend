// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';

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

    return expectSaga(lib.putAndReturn, dummyAction)
      .put({ ...dummyAction, asyncRequestId: dummyId })
      .dispatch(actions.setSuccess(dummyId, dummyValue))
      .returns(dummyValue)
      .run();
  });

  it(`puts the passed action, waits until a matching setFailure action dispatched, and re-throws the error`, async (): Promise<mixed> => {
    const dummyAction = { type: 'dummy' };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(lib.putAndReturn, dummyAction)
        .put({ ...dummyAction, asyncRequestId: dummyId })
        .dispatch(actions.setFailure(dummyId, dummyError))
        .run(),
    ).rejects.toStrictEqual(dummyError);
  });

});
