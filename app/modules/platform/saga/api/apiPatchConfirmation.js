// @flow

import { flashMessage, flashErrorMessage } from 'redux-flash';
import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import api from 'api';
import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

const apiPatchConfirmation = function* (
  action: a.ApiPatchConfirmationAction,
): Saga<void> {
  yield put(asyncRequests.actions.setPending(action.type));

  try {
    const { confirmationToken } = action.payload;
    yield call(api.confirmation.patch, confirmationToken);
    yield put(asyncRequests.actions.setSuccess(action.type));
    yield put(flashMessage('api:confirmation.patch.success'));
  }
  catch (error) {
    yield put(asyncRequests.actions.setFailure(action.type, error));
    yield put(flashErrorMessage('api:confirmation.patch.failure'));
  }
};

export default apiPatchConfirmation;
