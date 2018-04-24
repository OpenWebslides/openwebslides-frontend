// @flow

import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { apiPostToken } from '../../actions';

const signinEmailSaga = function* (action: t.SigninEmailAction): Generator<*, *, *> {
  const { email, password } = action.payload;

  yield put(apiPostToken(email, password));
};

export default signinEmailSaga;
