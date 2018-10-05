// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as paths from 'config/routes';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const sendResetPasswordEmail = function* (
  action: a.SendResetPasswordEmailAction,
): Saga<void> {
  const { email } = action.payload;

  yield call(putAndReturn, actions.apiPostPassword(email));
  yield put(push(paths.AUTH_SIGNIN_ROUTE));
};

export default sendResetPasswordEmail;
