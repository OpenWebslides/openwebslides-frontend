// @flow

import confirmEmail from './confirmEmail';
import resendConfirmationEmail from './resendConfirmationEmail';
import resetPassword from './resetPassword';
import signin from './signin';
import signout from './signout';
import signup from './signup';
import toggleSidebar from './toggleSidebar';

const taskSagaActions = {
  confirmEmail,
  resendConfirmationEmail,
  resetPassword,
  signin,
  signout,
  signup,
  toggleSidebar,
};

export default taskSagaActions;
