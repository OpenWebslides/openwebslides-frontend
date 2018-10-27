// @flow

/* eslint-disable func-style */

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { type SagaAction, type AsyncRequestData } from 'types/actions';
import errors from 'modules/errors';

import actions from '../../actions';

import lib from '..';

/**
 * Wrapper function for sagas that makes its execution and results traceable
 * through the asyncRequests module.
 * To use, insert it when TAKEing actions and pass the associated saga as an argument instead:
 *
 *    takeEvery(ACTION_TYPE, sagaWrapper, sagaAssociatedWithActionType);
 *
 * Note: use putAndReturn() instead of put() for dispatching saga actions
 * in order to wait for their completion. Warning: as soon as put() is used instead of
 * putAndReturn(), waiting for completion becomes inpossible for sagas further up the stack.
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
    };
    // $FlowFixMe Flow doesn't realize the copied action is still of type A.
    actionWithAsyncRequestData = {
      ...action,
      asyncRequestData,
    };
  }

  try {
    // Set status to PENDING and call the passed saga.
    yield put(actions.setPending(asyncRequestData.id));
    const returnValue = yield call(saga, actionWithAsyncRequestData);

    // If no error occurred, set status to SUCCESS and pass on the return value.
    yield put(actions.setSuccess(asyncRequestData.id, returnValue));

    // If logging is enabled for this action.
    // if (asyncRequestData.log === true) {
    // #TODO flash success message
    // }
  }
  catch (error) {
    // If an error occurred, set status to FAILURE and pass on the error.
    yield put(actions.setFailure(asyncRequestData.id, error));

    // If logging is enabled for this action.
    if (asyncRequestData.log === true) {
      // Log the error.
      yield put(errors.actions.log(error));
      // #TODO flash error message
    }
  }
}

export default sagaWrapper;
