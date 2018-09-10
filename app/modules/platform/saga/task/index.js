// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequestSagaWrapper from 'lib/asyncRequestSagaWrapper';

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
    takeEvery(a.CONFIRM_EMAIL, asyncRequestSagaWrapper, confirmEmail),
    takeEvery(a.RESEND_CONFIRMATION_EMAIL, asyncRequestSagaWrapper, resendConfirmationEmail),
    takeEvery(a.RESET_PASSWORD, asyncRequestSagaWrapper, resetPassword),
    takeEvery(a.SEND_RESET_PASSWORD_EMAIL, asyncRequestSagaWrapper, sendResetPasswordEmail),
    takeEvery(a.SIGNIN, asyncRequestSagaWrapper, signin),
    takeEvery(a.SIGNIN_SSO, asyncRequestSagaWrapper, signinSSO),
    takeEvery(a.SIGNOUT, asyncRequestSagaWrapper, signout),
    takeEvery(a.SIGNUP, asyncRequestSagaWrapper, signup),
    takeEvery(a.TOGGLE_SIDEBAR, asyncRequestSagaWrapper, toggleSidebar),
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
