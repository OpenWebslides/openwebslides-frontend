// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { type SagaAction } from 'types/actions';

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

  try {
    // Set status to PENDING and call the passed saga.
    yield put(actions.setPending(asyncRequestId));
    const returnValue = yield call(saga, action);

    // If no error occurred, set status to SUCCESS and pass on the return value.
    yield put(actions.setSuccess(asyncRequestId, returnValue));
    // #TODO flash success message
  }
  catch (error) {
    // If an error occurred, set status to FAILURE and pass on the error.
    yield put(actions.setFailure(asyncRequestId, error));
    // #TODO flash error message
  }
}

export default sagaWrapper;
