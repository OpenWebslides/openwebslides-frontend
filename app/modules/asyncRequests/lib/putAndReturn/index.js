// @flow

/**
 * Makes sure that the passed action has an asyncRequestId so that its results can be traced,
 * then puts the action so that the associated saga can execute it,
 * waits for the associated saga to complete and returns its return value in case of success
 * or re-throws the error in case of failure.
 *
 * Note: putAndReturn only works in conjuction with sagas that have been wrapped in sagaWrapper
 * before being executed; otherwise no setSuccess / setFailure action will be dispatched and
 * putAndReturn will never return.
 */

import { type Saga } from 'redux-saga';
import { put, take } from 'redux-saga/effects';

import { type ModulesAction } from 'types/redux';

import * as a from '../../actionTypes';

import lib from '..';

const putAndReturn = function* (action: ModulesAction): Saga<mixed> {
  // Get the actions asyncRequestId, if present;
  // if no asyncRequestId was passed, generate a random one.
  const asyncRequestId = (action.asyncRequestId != null)
    ? action.asyncRequestId
    : lib.generateId(action.type);
  // Create a copy of the action that has its asyncRequestId property set.
  const actionWithId = {
    ...action,
    asyncRequestId,
  };

  // Dispatch the actionWithId.
  yield put(actionWithId);

  // Wait for either a SUCCESS or FAILURE action with a matching id to be dispatched and take it.
  const successOrFailureAction = yield take((takenAction: ModulesAction): boolean => {
    return (
      (takenAction.type === a.SET_SUCCESS || takenAction.type === a.SET_FAILURE)
      && takenAction.payload.id != null
      && takenAction.payload.id === asyncRequestId
    );
  });

  // Depending on SUCCESS or FAILURE, either return the SUCCESS value or re-throw the FAILURE error.
  if (successOrFailureAction.type === a.SET_SUCCESS) {
    return successOrFailureAction.payload.value;
  }
  else {
    throw successOrFailureAction.payload.error;
  }
};

export default putAndReturn;
