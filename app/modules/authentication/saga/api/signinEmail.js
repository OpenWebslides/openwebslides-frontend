// @flow

import { call, put } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import Api from '../../api';

const signinEmailSaga = function* (action: t.SigninEmailAction): Generator<*, *, *> {
  try {
    const { email, password } = action.payload;
    const response = yield call(Api.signinEmail, email, password);

    const payload = {
      id: response.body.data.id,
      email,
      firstName: response.body.data.attributes.firstName,
      lastName: response.body.data.attributes.lastName,
    };

    yield put({ type: t.SIGNIN_EMAIL_SUCCESS, payload });
    yield put({ type: t.UPDATE_TOKEN, payload: { token: response.token } });
  }
  catch (error) {
    yield put({ type: t.SIGNIN_EMAIL_FAILURE, error });
  }
};

export default signinEmailSaga;
