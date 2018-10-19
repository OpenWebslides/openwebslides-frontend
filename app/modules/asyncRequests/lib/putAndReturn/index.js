// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import { type ModulesAction } from 'types/redux';

import * as a from '../../actionTypes';

import lib from '..';

const putAndReturn = function* (action: ModulesAction): Saga<mixed> {
  const asyncRequestId = yield call(lib.putAndGetId, action);
  const finishedAction = yield call(lib.takeFinishedById, asyncRequestId);

  if (finishedAction.type === a.SET_SUCCESS) {
    return finishedAction.payload.value;
  }
  else {
    throw finishedAction.payload.error;
  }
};

export default putAndReturn;
