// @flow

import { flashErrorMessage } from 'redux-flash';

import { TokenApi } from 'lib/api';
import api from 'modules/api';
import { call, put, select } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import {
  setAccountInState,
  setTokenInState,
} from '../../actions';
import { getToken } from '../../selectors';

const { setStatusInState } = api.actions;
const { statusTypes } = api.model;

export const apiPostTokenSaga = function* (action: t.ApiPostTokenAction): Generator<*, *, *> {
  yield put(setStatusInState(t.API_POST_TOKEN, statusTypes.PENDING));

  try {
    const { email, password } = action.payload;
    const response = yield call(TokenApi.post, email, password);

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

    yield call(TokenApi.destroy, token);

    yield put(setAccountInState(null));
    yield put(setTokenInState(null));
  }
  catch (error) {
    // TODO: fix saga error handling
    throw error;
  }
};
