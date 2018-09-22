// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { type ModulesAction } from 'types/redux';

import lib from '..';

const putAndGetId = function* (action: ModulesAction): Saga<string> {
  const actionWithId = {
    ...action,
    asyncRequestId: lib.generateId(action.type),
  };
  yield put(actionWithId);
  return actionWithId.asyncRequestId;
};

export default putAndGetId;
