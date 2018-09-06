// @flow

import { flashMessage, flashErrorMessage } from 'redux-flash';
import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import api from 'api';
import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

const apiPostConfirmation = function* (
  action: a.ApiPostConfirmationAction,
): Saga<void> {
  yield put(asyncRequests.actions.setPending(action.type));

  try {
    const { email } = action.payload;
    yield call(api.confirmation.post, email);
    yield put(asyncRequests.actions.setSuccess(action.type));
    yield put(flashMessage('api:confirmation.post.success'));
  }
  catch (error) {
    yield put(asyncRequests.actions.setFailure(action.type, error));
    yield put(flashErrorMessage('api:confirmation.post.failure'));
  }
};

export default apiPostConfirmation;
