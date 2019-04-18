// @flow

import { type Saga } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import * as m from '../../model';
import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const ssoSignin = function* (action: a.SSOSigninAction): Saga<void> {
  const { userId, refreshToken } = action.payload;

  // Set authentication state
  const currentUserAuth: m.UserAuth = {
    userId,
    refreshToken,
    accessToken: null,
  };
  yield put(actions.setUserAuthInState(currentUserAuth));

  // Request access token
  yield call(putAndReturn, actions.refresh());
};

export default ssoSignin;
