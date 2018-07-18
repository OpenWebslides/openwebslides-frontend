// @flow

import confirmEmail from './confirmEmail';
import resetPassword from './resetPassword';
import signin from './signin';
import signout from './signout';
import signup from './signup';

const taskSagaActions = {
  confirmEmail,
  resetPassword,
  signin,
  signout,
  signup,
};

export default taskSagaActions;
