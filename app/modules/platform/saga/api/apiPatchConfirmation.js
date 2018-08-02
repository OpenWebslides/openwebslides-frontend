// @flow

import { flashMessage, flashErrorMessage } from 'redux-flash';
import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import api from 'api';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import * as a from '../../actionTypes';

const apiPatchConfirmation = function* (
  action: a.ApiPatchConfirmationAction,
): Saga<void> {
  yield put(apiRequestsStatus.actions.setPending(action.type));

  try {
    const { confirmationToken } = action.payload;
    yield call(api.confirmation.patch, confirmationToken);
    yield put(apiRequestsStatus.actions.setSuccess(action.type));
    yield put(flashMessage('api:confirmation.patch.success'));
  }
  catch (error) {
    yield put(apiRequestsStatus.actions.setFailure(action.type, error));
    yield put(flashErrorMessage('api:confirmation.patch.failure'));
  }
};

export default apiPatchConfirmation;
