// @flow

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
 */

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { type SagaAction } from 'types/actions';
import errors from 'modules/errors';

import actions from '../../actions';

import lib from '..';

// eslint-disable-next-line func-style
function* sagaWrapper<A: SagaAction>(
  saga: (action: A) => (Saga<mixed> | Saga<void>),
  action: A,
): Saga<void> {
  // Get the actions asyncRequestId, if present;
  // if no asyncRequestId was passed, generate a random one.
  const asyncRequestId = (action.asyncRequestId != null)
    ? action.asyncRequestId
    : lib.generateId(action.type);
  // Create a copy of the action that has its asyncRequestId property set,
  // in case a saga further down the line needs it.
  const actionWithId = {
    ...action,
    asyncRequestId,
  };

  try {
    // Set status to PENDING and call the passed saga.
    yield put(actions.setPending(actionWithId.asyncRequestId));
    // $FlowFixMe Flow doesn't realize actionWithId is still of type A.
    const returnValue = yield call(saga, actionWithId);

    // If no error occurred, set status to SUCCESS and pass on the return value.
    yield put(actions.setSuccess(actionWithId.asyncRequestId, returnValue));
    // #TODO flash success message
  }
  catch (error) {
    // If an error occurred, set status to FAILURE and pass on the error.
    yield put(actions.setFailure(actionWithId.asyncRequestId, error));
    // Log the error.
    yield put(errors.actions.log(error));
    // #TODO flash error message
  }
}

export default sagaWrapper;
