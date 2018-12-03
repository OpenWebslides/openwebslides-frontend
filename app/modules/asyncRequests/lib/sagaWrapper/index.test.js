// @flow

import { flashSuccessMessage, flashErrorMessage } from 'redux-flash';
import { type Saga } from 'redux-saga';
import { expectSaga } from 'redux-saga-test-plan';

import { type SagaAction } from 'types/actions';
import i18next from 'config/i18next';
import errors from 'modules/errors';
import { NetworkError } from 'errors';

import actions from '../../actions';

import lib from '..';

describe(`sagaWrapper`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    lib.generateId = jest.fn((): string => dummyId);
    i18next.exists = jest.fn((): boolean => false);
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

  it(`displays a success flash message, when the passed saga completes without errors, the actions's asyncRequestData.log property is set to TRUE and a success message key for the actionType exists`, (): void => {
    i18next.exists = jest.fn((): boolean => true);

    const dummyReturnValue = 'dummyReturnValue';
    // eslint-disable-next-line require-yield
    const dummySaga = function* (action: SagaAction): Saga<string> {
      return dummyReturnValue;
    };
    const dummyAction = { type: 'dummy', asyncRequestData: { id: 'dummyId', log: true } };

    return expectSaga(lib.sagaWrapper, dummySaga, dummyAction)
      .put(flashSuccessMessage(`flash:${dummyAction.type}.success`))
      .run();
  });

  it(`does not display a flash message, when the passed saga completes without errors and the action's asyncRequestsData.log property is set to FALSE`, (): void => {
    i18next.exists = jest.fn((): boolean => true);

    const dummyReturnValue = 'dummyReturnValue';
    // eslint-disable-next-line require-yield
    const dummySaga = function* (action: SagaAction): Saga<string> {
      return dummyReturnValue;
    };
    const dummyAction = { type: 'dummy', asyncRequestData: { id: 'dummyId', log: false } };

    return expectSaga(lib.sagaWrapper, dummySaga, dummyAction)
      .not.put(flashSuccessMessage(`flash:${dummyAction.type}.success`))
      .run();
  });

  it(`does not display a flash message, when the passed saga completes without errors and a success message key for the actionType does not exist`, (): void => {
    i18next.exists = jest.fn((): boolean => false);

    const dummyReturnValue = 'dummyReturnValue';
    // eslint-disable-next-line require-yield
    const dummySaga = function* (action: SagaAction): Saga<string> {
      return dummyReturnValue;
    };
    const dummyAction = { type: 'dummy', asyncRequestData: { id: 'dummyId', log: false } };

    return expectSaga(lib.sagaWrapper, dummySaga, dummyAction)
      .not.put(flashSuccessMessage(`flash:${dummyAction.type}.success`))
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

  it(`displays an error flash message, when the passed saga throws an error, the actions's asyncRequestData.log property is set to TRUE and an error message key for the actionType exists`, (): void => {
    i18next.exists = jest.fn((): boolean => true);

    const dummyError = new Error('dummyError');
    // eslint-disable-next-line require-yield
    const dummySaga = function* (action: SagaAction): Saga<void> {
      throw dummyError;
    };
    const dummyAction = { type: 'dummy', asyncRequestData: { id: 'dummyId', log: true } };

    return expectSaga(lib.sagaWrapper, dummySaga, dummyAction)
      .put(flashErrorMessage(`flash:${dummyAction.type}.error`, { timeout: false }))
      .run();
  });

  it(`does not display a flash message, when the passed saga throws an error and the action's asyncRequestsData.log property is set to FALSE`, (): void => {
    i18next.exists = jest.fn((): boolean => true);

    const dummyError = new Error('dummyError');
    // eslint-disable-next-line require-yield
    const dummySaga = function* (action: SagaAction): Saga<void> {
      throw dummyError;
    };
    const dummyAction = { type: 'dummy', asyncRequestData: { id: 'dummyId', log: false } };

    return expectSaga(lib.sagaWrapper, dummySaga, dummyAction)
      .not.put(flashErrorMessage(`flash:${dummyAction.type}.error`, { timeout: false }))
      .run();
  });

  it(`does not display a flash message, when the passed saga throws an error and an error message key for the actionType does not exist`, (): void => {
    i18next.exists = jest.fn((): boolean => false);

    const dummyError = new Error('dummyError');
    // eslint-disable-next-line require-yield
    const dummySaga = function* (action: SagaAction): Saga<void> {
      throw dummyError;
    };
    const dummyAction = { type: 'dummy', asyncRequestData: { id: 'dummyId', log: true } };

    return expectSaga(lib.sagaWrapper, dummySaga, dummyAction)
      .not.put(flashErrorMessage(`flash:${dummyAction.type}.error`, { timeout: false }))
      .run();
  });

  it(`displays an error flash message when the passed saga throws a network error`, (): void => {
    i18next.exists = jest.fn((): boolean => true);

    const dummyError = new NetworkError('dummyError');
    // eslint-disable-next-line require-yield
    const dummySaga = function* (action: SagaAction): Saga<void> {
      throw dummyError;
    };
    const dummyAction = { type: 'dummy', asyncRequestData: { id: 'dummyId', log: true } };

    return expectSaga(lib.sagaWrapper, dummySaga, dummyAction)
      .put(flashErrorMessage(`flash:NetworkError`, { timeout: false }))
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
