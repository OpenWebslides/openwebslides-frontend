// @flow

import confirmEmail from './confirmEmail';
import refresh from './refresh';
import resendConfirmationEmail from './resendConfirmationEmail';
import resetPassword from './resetPassword';
import sendResetPasswordEmail from './sendResetPasswordEmail';
import setUserAuth from './setUserAuth';
import signin from './signin';
import signout from './signout';
import toggleSidebar from './toggleSidebar';

const taskSagaActions = {
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

export default taskSagaActions;
