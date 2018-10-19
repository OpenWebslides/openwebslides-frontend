// @flow

import { type Saga } from 'redux-saga';
import { take } from 'redux-saga/effects';

import { type ModulesAction } from 'types/redux';

import * as a from '../../actionTypes';

const takeFinishedById = function* (
  asyncRequestId: string,
): Saga<(a.SetSuccessAction | a.SetFailureAction)> {
  const matchingAction = yield take((action: ModulesAction): boolean => {
    return (
      (action.type === a.SET_SUCCESS || action.type === a.SET_FAILURE)
      && action.payload.id != null
      && action.payload.id === asyncRequestId
    );
  });

  return matchingAction;
};

export default takeFinishedById;
