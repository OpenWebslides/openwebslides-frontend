// @flow

import confirmEmail from './confirmEmail';
import resendConfirmationEmail from './resendConfirmationEmail';
import resetPassword from './resetPassword';
import sendResetPasswordEmail from './sendResetPasswordEmail';
import signin from './signin';
import signinSSO from './signinSSO';
import signout from './signout';
import signup from './signup';
import toggleSidebar from './toggleSidebar';

const taskSagaActions = {
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

export default taskSagaActions;
