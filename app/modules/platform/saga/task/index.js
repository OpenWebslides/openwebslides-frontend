// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

import confirmEmail from './confirmEmail';
import resendConfirmationEmail from './resendConfirmationEmail';
import resetPassword from './resetPassword';
import sendResetPasswordEmail from './sendResetPasswordEmail';
import setUserAuth from './setUserAuth';
import signin from './signin';
import signout from './signout';
import signup from './signup';
import toggleSidebar from './toggleSidebar';

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.CONFIRM_EMAIL, asyncRequests.lib.sagaWrapper, confirmEmail),
    takeEvery(a.RESEND_CONFIRMATION_EMAIL, asyncRequests.lib.sagaWrapper, resendConfirmationEmail),
    takeEvery(a.RESET_PASSWORD, asyncRequests.lib.sagaWrapper, resetPassword),
    takeEvery(a.SEND_RESET_PASSWORD_EMAIL, asyncRequests.lib.sagaWrapper, sendResetPasswordEmail),
    takeEvery(a.SET_USER_AUTH, asyncRequests.lib.sagaWrapper, setUserAuth),
    takeEvery(a.SIGNIN, asyncRequests.lib.sagaWrapper, signin),
    takeEvery(a.SIGNOUT, asyncRequests.lib.sagaWrapper, signout),
    takeEvery(a.SIGNUP, asyncRequests.lib.sagaWrapper, signup),
    takeEvery(a.TOGGLE_SIDEBAR, asyncRequests.lib.sagaWrapper, toggleSidebar),
  ]);
};

const taskSagas = {
  confirmEmail,
  resendConfirmationEmail,
  resetPassword,
  sendResetPasswordEmail,
  setUserAuth,
  signin,
  signout,
  signup,
  toggleSidebar,
};

export { taskSagas };
export default taskSaga;
