// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const signin = function* (action: a.SigninAction): Saga<void> {
  const { email, password } = action.payload;
  yield call(putAndReturn, actions.apiPostSigninToTokenAndGetUserAuth(email, password));
};

export default signin;
