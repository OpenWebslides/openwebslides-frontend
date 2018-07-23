// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import confirmEmail from './confirmEmail';
import resendConfirmationEmail from './resendConfirmationEmail';
import resetPassword from './resetPassword';
import signin from './signin';
import signout from './signout';
import signup from './signup';
import toggleSidebar from './toggleSidebar';

const taskSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(a.CONFIRM_EMAIL, confirmEmail),
    takeEvery(a.RESEND_CONFIRMATION_EMAIL, resendConfirmationEmail),
    takeEvery(a.RESET_PASSWORD, resetPassword),
    takeEvery(a.SIGNIN, signin),
    takeEvery(a.SIGNOUT, signout),
    takeEvery(a.SIGNUP, signup),
    takeEvery(a.TOGGLE_SIDEBAR, toggleSidebar),
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
