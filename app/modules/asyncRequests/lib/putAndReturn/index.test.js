// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';

import lib from '..';

describe(`putAndReturn`, (): void => {

  let dummyId: string;
  let dummyValue: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyValue = 'dummyValue';
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

});
