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
    const dummyAction = { type: 'dummy', asyncRequestData: { id: 'dummyId', log: true } };

    return expectSaga(lib.sagaWrapper, dummySaga, dummyAction)
      .put(actions.setPending(dummyAction.asyncRequestData.id))
      .call(dummySaga, dummyAction)
      .put(actions.setSuccess(dummyAction.asyncRequestData.id, dummyReturnValue))
      .run();
  });

  it(`sets the request's asyncRequests status to PENDING, calls the passed saga and then sets the request's asyncRequests status to FAILURE, when the passed saga throws an error`, (): void => {
    const dummyError = new Error('dummyError');
    // eslint-disable-next-line require-yield
    const dummySaga = function* (action: SagaAction): Saga<void> {
      throw dummyError;
    };
    const dummyAction = { type: 'dummy', asyncRequestData: { id: 'dummyId', log: true } };

    return expectSaga(lib.sagaWrapper, dummySaga, dummyAction)
      .put(actions.setPending(dummyAction.asyncRequestData.id))
      .call(dummySaga, dummyAction)
      .put(actions.setFailure(dummyAction.asyncRequestData.id, dummyError))
      .run();
  });

  it(`logs the error, when the passed saga throws an error and the action's asyncRequestData.log property is set to TRUE`, (): void => {
    const dummyError = new Error('dummyError');
    // eslint-disable-next-line require-yield
    const dummySaga = function* (action: SagaAction): Saga<void> {
      throw dummyError;
    };
    const dummyAction = { type: 'dummy', asyncRequestData: { id: 'dummyId', log: true } };

    return expectSaga(lib.sagaWrapper, dummySaga, dummyAction)
      .put(errors.actions.log(dummyError))
      .run();
  });

  it(`does not log the error, when the passed saga throws an error and the action's asyncRequestData.log property is set to FALSE`, (): void => {
    const dummyError = new Error('dummyError');
    // eslint-disable-next-line require-yield
    const dummySaga = function* (action: SagaAction): Saga<void> {
      throw dummyError;
    };
    const dummyAction = { type: 'dummy', asyncRequestData: { id: 'dummyId', log: false } };

    return expectSaga(lib.sagaWrapper, dummySaga, dummyAction)
      .not.put.actionType(errors.actionTypes.LOG)
      .run();
  });

  it(`generates asyncRequestData with a random id, when no existing asyncRequestData is set on the action`, (): void => {
    // eslint-disable-next-line require-yield
    const dummySaga = function* (action: SagaAction): Saga<void> {
      // placeholder
    };
    const dummyAction = { type: 'dummy' };

    return expectSaga(lib.sagaWrapper, dummySaga, dummyAction)
      .call(dummySaga, { ...dummyAction, asyncRequestData: { id: dummyId, log: true } })
      .put(actions.setPending(dummyId))
      .run();
  });

});
