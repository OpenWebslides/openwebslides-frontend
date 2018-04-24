// @flow

import { call, put, select } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import Api from '../../api';
import {
  setAccountInState,
  setTokenInState,
} from '../../actions';
import { getToken } from '../../selectors';

export const apiPostTokenSaga = function* (action: t.ApiPostTokenAction): Generator<*, *, *> {
  try {
    const { email, password } = action.payload;
    const response = yield call(Api.signinEmail, email, password);

    const account = {
      id: response.body.data.id,
      email,
      firstName: response.body.data.attributes.firstName,
      lastName: response.body.data.attributes.lastName,
    };

    yield put(setAccountInState(account));
    yield put(setTokenInState(response.token));
  }
  catch (error) {
    // TODO
  }
};

export const apiDeleteTokenSaga = function* (action: t.ApiDeleteTokenAction): Generator<*, *, *> {
  try {
    const token = yield select(getToken);

    yield call(Api.signout, token);

    yield put(setAccountInState(null));
    yield put(setTokenInState(null));
  }
  catch (error) {
    throw error;
  }
};
