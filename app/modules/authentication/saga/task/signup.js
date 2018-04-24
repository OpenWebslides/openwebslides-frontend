// @flow

import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { apiPostUsers } from '../../actions';

const signupSaga = function* (action: t.SignupAction): Generator<*, *, *> {
  const { email, firstName, lastName, password, tosAccepted } = action.payload;

  yield put(apiPostUsers(email, firstName, lastName, password, tosAccepted));
};

export default signupSaga;
