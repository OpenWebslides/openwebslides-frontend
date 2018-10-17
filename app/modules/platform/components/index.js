// @flow

import AuthMenu from './AuthMenu';
import AuthWrapper from './AuthWrapper';
import ResendConfirmationEmailCard from './ResendConfirmationEmailCard';
import ResetPasswordCard from './ResetPasswordCard';
import SendResetPasswordEmailCard from './SendResetPasswordEmailCard';
import SidebarsMenu from './SidebarsMenu';
import SigninCard from './SigninCard';
import SignupCard from './SignupCard';
import UnauthWrapper from './UnauthWrapper';

const components = {
  AuthMenu,
  AuthWrapper,
  ResendConfirmationEmailCard,
  ResetPasswordCard,
  SendResetPasswordEmailCard,
  SidebarsMenu,
  SigninCard,
  SignupCard,
  UnauthWrapper,
};

/* istanbul ignore next */
// $FlowFixMe Necessary to make hot loading work for components through index files
if (module.hot) module.hot.accept();

export default components;
