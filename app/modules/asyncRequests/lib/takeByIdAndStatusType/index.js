// @flow

import { type Saga } from 'redux-saga';
import { take } from 'redux-saga/effects';

import { type ModulesAction } from 'types/redux';

import * as a from '../../actionTypes';
import * as m from '../../model';

const statusTypesToActionTypesMap = {
  [m.statusTypes.PENDING]: a.SET_PENDING,
  [m.statusTypes.SUCCESS]: a.SET_SUCCESS,
  [m.statusTypes.FAILURE]: a.SET_FAILURE,
};

const takeByIdAndStatusType = function* (
  asyncRequestId: string,
  statusType: m.StatusType,
): Saga<(a.SetPendingAction | a.SetSuccessAction | a.SetFailureAction)> {
  const matchingAction = yield take((action: ModulesAction): boolean => {
    return (
      action.type === statusTypesToActionTypesMap[statusType]
      && action.payload.id != null
      && action.payload.id === asyncRequestId
    );
  });

  return matchingAction;
};

export default takeByIdAndStatusType;
