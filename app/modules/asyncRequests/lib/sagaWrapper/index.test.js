// @flow

import { type Saga } from 'redux-saga';
import { expectSaga } from 'redux-saga-test-plan';

import { type SagaAction } from 'types/actions';
import errors from 'modules/errors';

import actions from '../../actions';

import lib from '..';

describe(`sagaWrapper`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    lib.generateId = jest.fn((): string => dummyId);
  });

  it(`sets the request's asyncRequests status to PENDING, calls the passed saga and then sets the request's asyncRequests status to SUCCESS, when the passed saga completes without errors`, (): void => {
    const dummyReturnValue = 'dummyReturnValue';
    // eslint-disable-next-line require-yield
    const dummySaga = function* (action: SagaAction): Saga<string> {
      return dummyReturnValue;
    };
    const dummyAction = { type: 'dummy', asyncRequestId: 'dummyId' };

    return expectSaga(lib.sagaWrapper, dummySaga, dummyAction)
      .put(actions.setPending(dummyAction.asyncRequestId))
      .call(dummySaga, dummyAction)
      .put(actions.setSuccess(dummyAction.asyncRequestId, dummyReturnValue))
      .run();
  });

  it(`sets the request's asyncRequests status to PENDING, calls the passed saga and then sets the request's asyncRequests status to FAILURE and logs the error, when the passed saga throws an error`, (): void => {
    const dummyError = new Error('dummyError');
    // eslint-disable-next-line require-yield
    const dummySaga = function* (action: SagaAction): Saga<void> {
      throw dummyError;
    };
    const dummyAction = { type: 'dummy', asyncRequestId: 'dummyId' };

    return expectSaga(lib.sagaWrapper, dummySaga, dummyAction)
      .put(actions.setPending(dummyAction.asyncRequestId))
      .call(dummySaga, dummyAction)
      .put(actions.setFailure(dummyAction.asyncRequestId, dummyError))
      .put(errors.actions.log(dummyError))
      .run();
  });

  it(`generates a random asyncRequestId, when no existing asyncRequestId is set on the action`, (): void => {
    // eslint-disable-next-line require-yield
    const dummySaga = function* (action: SagaAction): Saga<void> {
      // placeholder
    };
    const dummyAction = { type: 'dummy' };

    return expectSaga(lib.sagaWrapper, dummySaga, dummyAction)
      .call(dummySaga, { ...dummyAction, asyncRequestId: dummyId })
      .put(actions.setPending(dummyId))
      .run();
  });

});
