// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';
import users from 'modules/users';

import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const signup = function* (action: a.SignupAction): Saga<void> {
  const { email, name, password, tosAccepted } = action.payload;
  yield call(putAndReturn, users.actions.apiPost(email, name, password, tosAccepted));
};

export default signup;
