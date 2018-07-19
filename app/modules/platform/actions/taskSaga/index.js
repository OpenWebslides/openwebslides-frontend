// @flow

import resendConfirmationEmail from './resendConfirmationEmail';
import resetPassword from './resetPassword';
import signin from './signin';
import signout from './signout';
import signup from './signup';

const taskSagaActions = {
  resendConfirmationEmail,
  resetPassword,
  signin,
  signout,
  signup,
};

export default taskSagaActions;
