// @flow

import { call, put } from 'redux-saga/effects';

import api from 'api';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import * as a from '../../actionTypes';

const apiPostConfirmation = function* (
  action: a.ApiPostConfirmationAction,
): Generator<*, *, *> {
  yield put(apiRequestsStatus.actions.setPending(action.type));

  try {
    const { confirmationToken } = action.payload;
    yield call(api.confirmation.post, confirmationToken);
    yield put(apiRequestsStatus.actions.setSuccess(action.type));
  }
  catch (error) {
    yield put(apiRequestsStatus.actions.setFailure(action.type, error));
  }
};

export default apiPostConfirmation;
