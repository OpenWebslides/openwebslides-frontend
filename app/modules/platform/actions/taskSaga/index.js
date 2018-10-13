// @flow

import confirmEmail from './confirmEmail';
import resendConfirmationEmail from './resendConfirmationEmail';
import resetPassword from './resetPassword';
import sendResetPasswordEmail from './sendResetPasswordEmail';
import setUserAuth from './setUserAuth';
import signin from './signin';
import signout from './signout';
import toggleSidebar from './toggleSidebar';

const taskSagaActions = {
  confirmEmail,
  resendConfirmationEmail,
  resetPassword,
  sendResetPasswordEmail,
  setUserAuth,
  signin,
  signout,
  toggleSidebar,
};

export default taskSagaActions;
