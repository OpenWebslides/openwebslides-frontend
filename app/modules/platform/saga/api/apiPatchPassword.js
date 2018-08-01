// @flow

import { flashMessage, flashErrorMessage } from 'redux-flash';
import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import api from 'api';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import * as a from '../../actionTypes';

const apiPatchPassword = function* (
  action: a.ApiPatchPasswordAction,
): Saga<void> {
  yield put(apiRequestsStatus.actions.setPending(action.type));

  try {
    const { password, resetPasswordToken } = action.payload;
    yield call(api.password.patch, password, resetPasswordToken);
    yield put(apiRequestsStatus.actions.setSuccess(action.type));
    yield put(flashMessage('api:password.patch.success'));
  }
  catch (error) {
    yield put(apiRequestsStatus.actions.setFailure(action.type, error));
    yield put(flashErrorMessage('api:password.patch.failure'));
  }
};

export default apiPatchPassword;
