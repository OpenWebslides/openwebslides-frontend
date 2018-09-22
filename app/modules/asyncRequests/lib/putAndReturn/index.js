// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import { type ModulesAction } from 'types/redux';

import lib from '..';

const putAndReturn = function* (action: ModulesAction): Saga<mixed> {
  const asyncRequestId = yield call(
    lib.putAndGetId,
    action,
  );
  const asyncRequestSuccessReturnValue = yield call(
    lib.takeSuccessById,
    asyncRequestId,
  );

  return asyncRequestSuccessReturnValue;
};

export default putAndReturn;
