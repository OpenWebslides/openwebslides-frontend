// @flow

import { flashSuccessMessage, flashErrorMessage } from 'redux-flash';
import { type Saga } from 'redux-saga';
import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import { type SagaAction } from 'types/actions';
import i18next from 'config/i18next';
import errors from 'modules/errors';
import { NetworkError, Http401UnauthorizedError } from 'errors';

import selectors from '../../selectors';
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
      .call(dummySaga, { ...dummyAction, asyncRequestData: { id: dummyId, log: true, replay: true } })
      .put(actions.setPending(dummyId))
      .run();
  });

  describe(`when the passed saga throws a HTTP 401 error`, (): void => {

    it(`fails the request, when the passed saga throws an error and replay is set to FALSE`, (): void => {
      const dummyError = new Http401UnauthorizedError();
      // eslint-disable-next-line require-yield
      const dummySaga = function* (action: SagaAction): Saga<void> {
        throw dummyError;
      };
      const dummyAction = { type: 'dummy', asyncRequestData: { id: 'dummyId', log: true, replay: false } };

      return expectSaga(lib.sagaWrapper, dummySaga, dummyAction)
        .put(actions.setPending(dummyAction.asyncRequestData.id))
        .call(dummySaga, dummyAction)
        .put(actions.setFailure(dummyAction.asyncRequestData.id, dummyError))
        .run();
    });

    describe(`when replay is set to TRUE`, (): void => {

      it(`waits until the REFRESH action is done when a REFRESH action is already pending, and replays the action (dispatches a duplicate)`, (): void => {
        const dummyError = new Http401UnauthorizedError();
        // eslint-disable-next-line require-yield
        const dummySaga = function* (action: SagaAction): Saga<void> {
          throw dummyError;
        };
        const dummyAction = { type: 'dummy', asyncRequestData: { id: 'dummyId', replay: true } };

        const provideEvent = (): any => {
          let i: number = 0;

          return {
            select({ selector }: any, next: any): any {
              if (selector === selectors.isRefreshing) {
                i += 1;
                // Return TRUE twice, then FALSE
                return (i <= 2);
              }

              return next();
            },
          };
        };

        return expectSaga(lib.sagaWrapper, dummySaga, dummyAction)
          .provide([
            provideEvent(),
          ])
          .put(actions.setPending(dummyAction.asyncRequestData.id))
          .call(dummySaga, dummyAction)
          .put(actions.setFailure(dummyAction.asyncRequestData.id, dummyError))
          .take('*')
          .put({ type: dummyAction.type })
          .run();
      });

      it(`dispatches a REFRESH action, waits for its completion and replays the action (dispatches a duplicate)`, (): void => {
        const dummyError = new Http401UnauthorizedError();
        // eslint-disable-next-line require-yield
        const dummySaga = function* (action: SagaAction): Saga<void> {
          throw dummyError;
        };
        const dummyAction = { type: 'dummy', asyncRequestData: { id: 'dummyId', replay: true } };

        return expectSaga(lib.sagaWrapper, dummySaga, dummyAction)
          .provide([
            [select(selectors.isRefreshing), false],
            [matchers.call.fn(lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
              return (action.type === 'platform/REFRESH') ? null : next();
            })],
          ])
          .put(actions.setPending(dummyAction.asyncRequestData.id))
          .call(dummySaga, dummyAction)
          .put(actions.setFailure(dummyAction.asyncRequestData.id, dummyError))
          .call(lib.putAndReturn, { type: 'platform/REFRESH', payload: {} })
          .put({ type: dummyAction.type })
          .run();
      });

      it(`dispatches a SIGNOUT action and displays an error flash message when the dispatched REFRESH action throws a HTTP 401 error`, (): void => {
        const dummyError = new Http401UnauthorizedError();
        // eslint-disable-next-line require-yield
        const dummySaga = function* (action: SagaAction): Saga<void> {
          throw dummyError;
        };
        const dummyAction = { type: 'dummy', asyncRequestData: { id: 'dummyId', replay: true } };

        return expectSaga(lib.sagaWrapper, dummySaga, dummyAction)
          .provide([
            [select(selectors.isRefreshing), false],
            [matchers.call.fn(lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
              if (action.type === 'platform/REFRESH') throw new Http401UnauthorizedError();
              return next();
            })],
          ])
          .put(actions.setPending(dummyAction.asyncRequestData.id))
          .call(dummySaga, dummyAction)
          .put(actions.setFailure(dummyAction.asyncRequestData.id, dummyError))
          .call(lib.putAndReturn, { type: 'platform/REFRESH', payload: {} })
          .put({ type: 'platform/SIGNOUT' })
          .put(flashErrorMessage(`flash:UnauthorizedError`, { timeout: false }))
          .run();
      });

    });

  });

});
