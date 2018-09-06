// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import api from 'api';
import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

const apiDeleteToken = function* (
  action: a.ApiDeleteTokenAction,
): Saga<void> {
  yield put(asyncRequests.actions.setPending(action.type));

  try {
    const { token } = action.payload;
    yield call(api.token.delete, token);
    yield put(asyncRequests.actions.setSuccess(action.type));
  }
  catch (error) {
    yield put(asyncRequests.actions.setFailure(action.type, error));
  }
};

export default apiDeleteToken;
