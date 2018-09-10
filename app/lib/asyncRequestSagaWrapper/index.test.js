// @flow

import { type Saga } from 'redux-saga';
import { expectSaga } from 'redux-saga-test-plan';

import asyncRequests from 'modules/asyncRequests';

import asyncRequestSagaWrapper from '.';

describe(`asyncRequestSagaWrapper`, (): void => {

  it(`sets the request's asyncRequests status to PENDING, calls the passed saga and then sets the request's asyncRequests status to SUCCESS, when the passed saga completes without errors`, (): void => {
    const dummyReturnValue = 'dummyReturnValue';
    // eslint-disable-next-line require-yield
    const dummySaga = function* (action: { +type: string }): Saga<string> {
      return dummyReturnValue;
    };
    const dummyAction = { type: 'dummy' };

    return expectSaga(asyncRequestSagaWrapper, dummySaga, dummyAction)
      .put(asyncRequests.actions.setPending(dummyAction.type))
      .call(dummySaga, dummyAction)
      .put(asyncRequests.actions.setSuccess(dummyAction.type, dummyReturnValue))
      .run();
  });

  it(`sets the request's asyncRequests status to PENDING, calls the passed saga and then sets the request's asyncRequests status to FAILURE, when the passed saga throws an error`, (): void => {
    const dummyError = new Error('dummyError');
    // eslint-disable-next-line require-yield
    const dummySaga = function* (action: { +type: string }): Saga<void> {
      throw dummyError;
    };
    const dummyAction = { type: 'dummy' };

    return expectSaga(asyncRequestSagaWrapper, dummySaga, dummyAction)
      .put(asyncRequests.actions.setPending(dummyAction.type))
      .call(dummySaga, dummyAction)
      .put(asyncRequests.actions.setFailure(dummyAction.type, dummyError))
      .run();
  });

});
