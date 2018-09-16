// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { type SagaAction } from 'types/actions';
import generateRandomString from 'lib/generateRandomString';
import asyncRequests from 'modules/asyncRequests';

// eslint-disable-next-line func-style
function* sagaWrapper<A: SagaAction>(
  saga: (action: A) => (Saga<mixed> | Saga<void>),
  action: A,
): Saga<void> {
  // Get the actions asyncRequestId, if present;
  // if no asyncRequestId was passed, generate a random one.
  // Note: we include the action type in the random id for easier debugging.
  const asyncRequestId = (action.asyncRequestId != null)
    ? action.asyncRequestId
    : `${action.type}-${generateRandomString(20)}`;

  try {
    // Set status to PENDING and call the passed saga.
    yield put(asyncRequests.actions.setPending(asyncRequestId));
    const returnValue = yield call(saga, action);

    // If no error occurred, set status to SUCCESS and pass on the return value.
    yield put(asyncRequests.actions.setSuccess(asyncRequestId, returnValue));
    // #TODO flash success message
  }
  catch (error) {
    // If an error occurred, set status to FAILURE and pass on the error.
    yield put(asyncRequests.actions.setFailure(asyncRequestId, error));
    // #TODO flash error message
  }
}

export default sagaWrapper;
