// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import users from 'modules/users';

import * as a from '../../actionTypes';

const signup = function* (action: a.SignupAction): Saga<void> {
  const { email, name, password, tosAccepted } = action.payload;
  yield put(users.actions.apiPost(email, name, password, tosAccepted));
};

export default signup;
