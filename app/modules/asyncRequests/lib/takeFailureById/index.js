// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import * as m from '../../model';

import lib from '..';

const takeFailureById = function* (asyncRequestId: string): Saga<Error> {
  const matchingAction = yield call(
    lib.takeByIdAndStatusType,
    asyncRequestId,
    m.statusTypes.FAILURE,
  );

  return matchingAction.payload.error;
};

export default takeFailureById;
