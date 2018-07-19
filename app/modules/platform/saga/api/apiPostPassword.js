// @flow

import { call, put } from 'redux-saga/effects';

import api from 'api';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import * as t from '../../actionTypes';

const apiPostPassword = function* (
  action: t.ApiPostPasswordAction,
): Generator<*, *, *> {
  yield put(apiRequestsStatus.actions.setPending(action.type));

  try {
    const { email } = action.payload;
    yield call(api.password.postEmail, email);
    yield put(apiRequestsStatus.actions.setSuccess(action.type));
  }
  catch (error) {
    yield put(apiRequestsStatus.actions.setFailure(action.type, error));
  }
};

export default apiPostPassword;
