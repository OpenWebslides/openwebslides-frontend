// @flow

import { expectSaga } from 'redux-saga-test-plan';

import lib from '..';

describe(`putAndGetId`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    lib.generateId = jest.fn((): string => dummyId);
  });

  it(`adds a randomly generated asyncRequestId to the passed action, PUTs it, and then returns the asyncRequestId`, (): void => {
    const dummyAction = { type: 'dummy' };

    return expectSaga(lib.putAndGetId, dummyAction)
      .put({ ...dummyAction, asyncRequestId: dummyId })
      .returns(dummyId)
      .run();
  });

});
