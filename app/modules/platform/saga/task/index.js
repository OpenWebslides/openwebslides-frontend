// @flow

/* eslint-disable sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import confirmEmail from './confirmEmail';
import resendConfirmationEmail from './resendConfirmationEmail';
import resetPassword from './resetPassword';
import sendResetPasswordEmail from './sendResetPasswordEmail';
import signin from './signin';
import signinSSO from './signinSSO';
import signout from './signout';
import signup from './signup';
import toggleSidebar from './toggleSidebar';

const taskSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.CONFIRM_EMAIL, confirmEmail),
    takeEvery(a.RESEND_CONFIRMATION_EMAIL, resendConfirmationEmail),
    takeEvery(a.RESET_PASSWORD, resetPassword),
    takeEvery(a.SEND_RESET_PASSWORD_EMAIL, sendResetPasswordEmail),
    takeEvery(a.SIGNIN, signin),
    takeEvery(a.SIGNIN_SSO, signinSSO),
    takeEvery(a.SIGNOUT, signout),
    takeEvery(a.SIGNUP, signup),
    takeEvery(a.TOGGLE_SIDEBAR, toggleSidebar),
  ]);
};

const taskSagas = {
  confirmEmail,
  resendConfirmationEmail,
  resetPassword,
  sendResetPasswordEmail,
  signin,
  signinSSO,
  signout,
  signup,
  toggleSidebar,
};

export { taskSagas };
export default taskSaga;
