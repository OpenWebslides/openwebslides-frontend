// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import confirmEmail from './confirmEmail';
import resendConfirmationEmail from './resendConfirmationEmail';
import resetPassword from './resetPassword';
import signin from './signin';
import signout from './signout';
import signup from './signup';
import toggleSidebar from './toggleSidebar';

const taskSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(t.CONFIRM_EMAIL, confirmEmail),
    takeEvery(t.RESEND_CONFIRMATION_EMAIL, resendConfirmationEmail),
    takeEvery(t.RESET_PASSWORD, resetPassword),
    takeEvery(t.SIGNIN, signin),
    takeEvery(t.SIGNOUT, signout),
    takeEvery(t.SIGNUP, signup),
    takeEvery(t.TOGGLE_SIDEBAR, toggleSidebar),
  ]);
};

const taskSagas = {
  confirmEmail,
  resendConfirmationEmail,
  resetPassword,
  signin,
  signout,
  signup,
  toggleSidebar,
};

export { taskSagas };
export default taskSaga;
