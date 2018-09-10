// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

// eslint-disable-next-line func-style
function* asyncRequestSagaWrapper<A: { +type: string }>(
  saga: (action: A) => (Saga<mixed> | Saga<void>),
  action: A,
): Saga<void> {
  const { type: asyncRequestId } = action;
  // #TODO const { asyncRequestId } = action.payload;
  yield put(asyncRequests.actions.setPending(asyncRequestId));

  try {
    const returnValue = yield call(saga, action);
    // #TODO flash success message
    yield put(asyncRequests.actions.setSuccess(asyncRequestId, returnValue));
  }
  catch (error) {
    // #TODO flash error message
    yield put(asyncRequests.actions.setFailure(asyncRequestId, error));
  }
}

export default asyncRequestSagaWrapper;
