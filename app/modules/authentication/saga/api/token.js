// @flow

import { call, put, select } from 'redux-saga/effects';
import { flashErrorMessage } from 'redux-flash';

import apis from 'apis';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import * as t from '../../actionTypes';
import {
  setAccountInState,
  setTokenInState,
} from '../../actions';
import { getToken } from '../../selectors';

const { setStatusInState } = apiRequestsStatus.actions;
const { statusTypes } = apiRequestsStatus.model;

export const apiPostTokenSaga = function* (action: t.ApiPostTokenAction): Generator<*, *, *> {
  yield put(setStatusInState(t.API_POST_TOKEN, statusTypes.PENDING));

  try {
    const { email, password } = action.payload;
    const response = yield call(apis.token.post, email, password);

    const account = {
      id: response.body.data.id,
      email,
      firstName: response.body.data.attributes.firstName,
      lastName: response.body.data.attributes.lastName,
    };

    yield put(setAccountInState(account));
    yield put(setTokenInState(response.token));
    yield put(setStatusInState(t.API_POST_TOKEN, statusTypes.SUCCESS));
  }
  catch (error) {
    yield put(setStatusInState(t.API_POST_TOKEN, statusTypes.FAILURE));
    yield put(flashErrorMessage('auth:signin.failure'));
  }
};

export const apiDeleteTokenSaga = function* (action: t.ApiDeleteTokenAction): Generator<*, *, *> {
  try {
    const token = yield select(getToken);

    yield call(apis.token.destroy, token);

    yield put(setAccountInState(null));
    yield put(setTokenInState(null));
  }
  catch (error) {
    // TODO: fix saga error handling
    throw error;
  }
};
