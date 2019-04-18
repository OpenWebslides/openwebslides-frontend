// @flow

import { type Saga } from 'redux-saga';
import { put, take } from 'redux-saga/effects';

import { type AsyncRequestData } from 'types/actions';
import { type ModulesAction } from 'types/redux';

import * as a from '../../actionTypes';

import lib from '..';

/**
 * Makes sure that the passed action has asyncRequestData so that its results can be traced,
 * then puts the action so that the associated saga can execute it,
 * waits for the associated saga to complete and returns its return value in case of success
 * or re-throws the error in case of failure.
 *
 * Note: putAndReturn only works in conjuction with sagas that have been wrapped in sagaWrapper
 * before being executed; otherwise no setSuccess / setFailure action will be dispatched and
 * putAndReturn will never return.
 *
 * @param   action  The action to be PUT.
 * @param   log     TRUE when errors during execution should be logged / flash messages displayed,
 *                  FALSE otherwise.
*                   Note 1: this only takes effect when the action doesn't already have an
 *                  asyncRequestData prop.
 *                  Note 2: default is FALSE, since actions passed through this function cannot
 *                  come straight from the UI and therefore don't usually need separate loggin /
 *                  flash messages; setting it to TRUE should only rarely be necessary.
 * @param   replay  TRUE when the action can be replayed on authentication error
 *                  FALSE otherwise (usually for API actions)
 *                  When a HTTP 401 is encountered and replay is set to TRUE, the access token
 *                  is refreshed and a new, duplicated action is dispatched.
 *                  Note: default is FALSE, since actions passed through this function cannot
 *                  come straight from the UI and therefore are generally API actions.
 * @returns Saga<void>
 */
const putAndReturn = function* (
  action: ModulesAction,
  log: boolean = false,
  replay: boolean = false,
): Saga<mixed> {
  let asyncRequestData: AsyncRequestData;
  let actionWithAsyncRequestData: typeof action;

  // Get the asyncRequestData from the action, if present, or generate a random one;
  // create a copy of the action that is sure to have its asyncRequestData prop set.
  if (action.asyncRequestData != null) {
    asyncRequestData = action.asyncRequestData;
    actionWithAsyncRequestData = action;
  }
  else {
    asyncRequestData = {
      id: lib.generateId(action.type),
      log,
      replay,
    };
    // $FlowFixMe couldn't decide which case to select
    actionWithAsyncRequestData = {
      ...action,
      asyncRequestData,
    };
  }

  // Dispatch the actionWithAsyncRequestData.
  yield put(actionWithAsyncRequestData);

  // Wait for either a SUCCESS or FAILURE action with a matching id to be dispatched and take it.
  const successOrFailureAction = yield take((takenAction: ModulesAction): boolean => {
    return (
      (takenAction.type === a.SET_SUCCESS || takenAction.type === a.SET_FAILURE)
      && takenAction.payload.id != null
      && takenAction.payload.id === asyncRequestData.id
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
