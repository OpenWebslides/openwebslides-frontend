// @flow

import { call, put, select } from 'redux-saga/effects';
import { flashErrorMessage } from 'redux-flash';

import api from 'api';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import * as t from '../../actionTypes';
import {
  setAccountInState,
  setTokenInState,
} from '../../actions';
import { getToken } from '../../selectors';

export const apiPostTokenSaga = function* (action: t.ApiPostTokenAction): Generator<*, *, *> {
  yield put(apiRequestsStatus.actions.setPending(t.API_POST_TOKEN));

  try {
    const { email, password } = action.payload;
    const response = yield call(api.token.post, email, password);

    const account = {
      id: response.body.data.id,
      email,
      firstName: response.body.data.attributes.firstName,
      lastName: response.body.data.attributes.lastName,
    };

    yield put(setAccountInState(account));
    yield put(setTokenInState(response.token));
    yield put(apiRequestsStatus.actions.setSuccess(t.API_POST_TOKEN));
  }
  catch (error) {
    yield put(apiRequestsStatus.actions.setFailure(t.API_POST_TOKEN, error));
    yield put(flashErrorMessage('auth:signin.failure'));
  }
};

export const apiDeleteTokenSaga = function* (action: t.ApiDeleteTokenAction): Generator<*, *, *> {
  try {
    const token = yield select(getToken);

    yield call(api.token.delete, token);

    yield put(setAccountInState(null));
    yield put(setTokenInState(null));
  }
  catch (error) {
    // TODO: fix saga error handling
    throw error;
  }
};
