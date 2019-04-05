// @flow

import confirmEmail from './confirmEmail';
import refresh from './refresh';
import resendConfirmationEmail from './resendConfirmationEmail';
import resetPassword from './resetPassword';
import sendResetPasswordEmail from './sendResetPasswordEmail';
import signin from './signin';
import signout from './signout';
import ssoSignin from './ssoSignin';
import toggleSidebar from './toggleSidebar';

const taskSagaActions = {
  confirmEmail,
  refresh,
  resendConfirmationEmail,
  resetPassword,
  sendResetPasswordEmail,
  signin,
  signout,
  ssoSignin,
  toggleSidebar,
};

export default taskSagaActions;
