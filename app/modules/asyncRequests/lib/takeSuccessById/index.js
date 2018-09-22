// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import * as m from '../../model';

import lib from '..';

const takeFailureById = function* (asyncRequestId: string): Saga<mixed> {
  const matchingAction = yield call(
    lib.takeByIdAndStatusType,
    asyncRequestId,
    m.statusTypes.SUCCESS,
  );

  return matchingAction.payload.value;
};

export default takeFailureById;
