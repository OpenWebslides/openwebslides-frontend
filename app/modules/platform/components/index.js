// @flow

// (Un)AuthWrappers
import AuthWrapper from './AuthWrapper';
import UnauthWrapper from './UnauthWrapper';
// Account management
import ResendConfirmationEmailCard from './ResendConfirmationEmailCard';
import ResetPasswordCard from './ResetPasswordCard';
import SigninCard from './SigninCard';
import SignupCard from './SignupCard';
// Settings
import SidebarsMenu from './SidebarsMenu';
import Sidebars from './Sidebars';

const components = {
  AuthWrapper,
  UnauthWrapper,
  ResendConfirmationEmailCard,
  ResetPasswordCard,
  SigninCard,
  SignupCard,
  SidebarsMenu,
  Sidebars,
};

/* istanbul ignore next */
// $FlowFixMe Necessary to make hot loading work for components through index files
if (module.hot) module.hot.accept();

export default components;
