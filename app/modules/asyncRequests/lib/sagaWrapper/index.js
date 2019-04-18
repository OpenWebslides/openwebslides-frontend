// @flow

/* eslint-disable func-style */

import { flashSuccessMessage, flashErrorMessage } from 'redux-flash';
import { type Saga } from 'redux-saga';
import { call, put, select, take } from 'redux-saga/effects';

import { type SagaAction, type AsyncRequestData } from 'types/actions';
import i18next from 'config/i18next';
import errors from 'modules/errors';
import { NetworkError, Http401UnauthorizedError } from 'errors';

import actions from '../../actions';
import selectors from '../../selectors';

import lib from '..';

/**
 * Wrapper function for sagas that makes its execution and results traceable
 * through the asyncRequests module.
 * To use, insert it when TAKEing actions and pass the associated saga as an argument instead:
 *
 *    takeEvery(ACTION_TYPE, sagaWrapper, sagaAssociatedWithActionType);
 *
 * Note 1: use putAndReturn() instead of put() for dispatching saga actions
 * in order to wait for their completion. Warning: as soon as put() is used instead of
 * putAndReturn(), waiting for completion becomes inpossible for sagas further up the stack.
 *
 * Note 2: In order for flash messages to be shown, the corresponding translator key has to exists.
 * Key format: 'flash:[ACTION_TYPE].success' and 'flash:[ACTION_TYPE].error'.
 *
 * @param   saga    The saga to which `action` will be passed.
 * @param   action  The action to execute.
 * @returns Saga<void>
 */
function* sagaWrapper<A: SagaAction>(
  saga: (action: A) => (Saga<mixed> | Saga<void>),
  action: A,
): Saga<void> {
  let asyncRequestData: AsyncRequestData;
  let actionWithAsyncRequestData: A;

  // Get the asyncRequestData from the action, if present, or generate a random one;
  // create a copy of the action that is sure to have its asyncRequestData prop set,
  // in case a saga further down the line needs it.
  if (action.asyncRequestData != null) {
    asyncRequestData = action.asyncRequestData;
    actionWithAsyncRequestData = action;
  }
  else {
    asyncRequestData = {
      id: lib.generateId(action.type),
      // Set logging to TRUE here by default,
      // since this code is mainly used for actions that were dispatched from the UI.
      log: true,
      // Set replay to TRUE here by default,
      // since this code is mainly used for actions that were dispatched from the UI.
      replay: true,
    };
    // $FlowFixMe Flow doesn't realize the copied action is still of type A.
    actionWithAsyncRequestData = {
      ...action,
      asyncRequestData,
    };
  }

  let flashMessageTranslatorKey: string;

  try {
    // Set status to PENDING and call the passed saga.
    yield put(actions.setPending(asyncRequestData.id));

    const returnValue = yield call(saga, actionWithAsyncRequestData);

    // If no error occurred, set status to SUCCESS and pass on the return value.
    yield put(actions.setSuccess(asyncRequestData.id, returnValue));

    // If logging is enabled for this action.
    if (asyncRequestData.log === true) {
      // Flash a success message, if one is defined.
      flashMessageTranslatorKey = `flash:${action.type}.success`;
      if (i18next.exists(flashMessageTranslatorKey)) {
        yield put(flashSuccessMessage(flashMessageTranslatorKey));
      }
    }
  }
  catch (error) {
    // If an error occurred, set status to FAILURE
    yield put(actions.setFailure(asyncRequestData.id, error));

    if (error instanceof NetworkError) {
      yield put(flashErrorMessage('flash:NetworkError', { timeout: false }));
    }
    else if (error instanceof Http401UnauthorizedError) {
      // Access token has expired, request a new one and replay action if necessary
      try {
        // Generally, API actions will have replay set to FALSE, and task actions to TRUE
        // So when one API request in a task saga returns a HTTP 401, the entire saga gets replayed
        if (asyncRequestData.replay) {
          // If no REFRESH request is pending, dispatch one
          // TODO: importing platform renders a cyclic dependency
          if (!(yield select(selectors.isRefreshing))) {
            yield call(lib.putAndReturn, { type: 'platform/REFRESH', payload: {} });
          }

          // Wait until REFRESH request is no longer pending
          while (yield select(selectors.isRefreshing)) yield take('*');

          // Replay action
          const replayAction = { ...action };
          delete replayAction.asyncRequestData;

          yield put(replayAction);
        }
      }
      catch (e) {
        // REFRESH action throws a HTTP 401, which means that
        // the refresh token has expired, and the user should be signed out
        yield put({ type: 'platform/SIGNOUT' });
        yield put(flashErrorMessage('flash:UnauthorizedError', { timeout: false }));
      }
    }

    // If logging is enabled for this action.
    if (asyncRequestData.log === true) {
      // Log the error.
      yield put(errors.actions.log(error));
      // Flash an error message, if one is defined.
      flashMessageTranslatorKey = `flash:${action.type}.error`;
      if (i18next.exists(flashMessageTranslatorKey)) {
        yield put(flashErrorMessage(flashMessageTranslatorKey, { timeout: false }));
      }
    }
  }
}

export default sagaWrapper;
