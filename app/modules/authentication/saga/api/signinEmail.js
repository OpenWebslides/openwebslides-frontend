// @flow

import { call, put } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import Api from '../../api';

const signinEmailSaga = function* (action: t.SigninEmailAction): Generator<*, *, *> {
  try {
    const { email, password } = action.payload;
    const response = yield call(Api.signinEmail, email, password);

    const payload = {
      id: response.data.id,
      email,
      firstName: response.data.attributes.firstName,
      lastName: response.data.attributes.lastName,
    };

    yield put({ type: t.SIGNIN_EMAIL_SUCCESS, payload });
  }
  catch (error) {
    yield put({ type: t.SIGNIN_EMAIL_FAILURE, error });
  }
};

export default signinEmailSaga;
