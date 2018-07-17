// @flow

import { put } from 'redux-saga/effects';

import users from 'modules/users';

import * as t from '../../actionTypes';

const signupSaga = function* (action: t.SignupAction): Generator<*, *, *> {
  const { email, firstName, lastName, password, tosAccepted } = action.payload;

  yield put(users.actions.apiPostUser(email, firstName, lastName, password, tosAccepted));
};

export default signupSaga;
