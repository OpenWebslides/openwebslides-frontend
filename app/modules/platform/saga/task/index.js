// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery, takeLeading } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

import confirmEmail from './confirmEmail';
import refresh from './refresh';
import resendConfirmationEmail from './resendConfirmationEmail';
import resetPassword from './resetPassword';
import sendResetPasswordEmail from './sendResetPasswordEmail';
import setUserAuth from './setUserAuth';
import signin from './signin';
import signout from './signout';
import toggleSidebar from './toggleSidebar';

const { sagaWrapper } = asyncRequests.lib;

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.CONFIRM_EMAIL, sagaWrapper, confirmEmail),
    // Use `takeLeading` to ignore additional calls while REFRESH saga is running
    takeLeading(a.REFRESH, sagaWrapper, refresh),
    takeEvery(a.RESEND_CONFIRMATION_EMAIL, sagaWrapper, resendConfirmationEmail),
    takeEvery(a.RESET_PASSWORD, sagaWrapper, resetPassword),
    takeEvery(a.SEND_RESET_PASSWORD_EMAIL, sagaWrapper, sendResetPasswordEmail),
    takeEvery(a.SET_USER_AUTH, sagaWrapper, setUserAuth),
    takeEvery(a.SIGNIN, sagaWrapper, signin),
    takeEvery(a.SIGNOUT, sagaWrapper, signout),
    takeEvery(a.TOGGLE_SIDEBAR, sagaWrapper, toggleSidebar),
  ]);
};

const taskSagas = {
  confirmEmail,
  refresh,
  resendConfirmationEmail,
  resetPassword,
  sendResetPasswordEmail,
  setUserAuth,
  signin,
  signout,
  toggleSidebar,
};

export { taskSagas };
export default taskSaga;
