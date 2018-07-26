// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import api from 'api';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import * as a from '../../actionTypes';

const apiDeleteToken = function* (
  action: a.ApiDeleteTokenAction,
): Saga<void> {
  yield put(apiRequestsStatus.actions.setPending(action.type));

  try {
    const { token } = action.payload;
    yield call(api.token.delete, token);
    yield put(apiRequestsStatus.actions.setSuccess(action.type));
  }
  catch (error) {
    yield put(apiRequestsStatus.actions.setFailure(action.type, error));
  }
};

export default apiDeleteToken;
