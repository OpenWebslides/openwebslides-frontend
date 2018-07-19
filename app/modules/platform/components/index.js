// @flow

// (Un)AuthWrappers
import AuthWrapper from './AuthWrapper';
import UnauthWrapper from './UnauthWrapper';
// Account management
import ResendConfirmationEmailCard from './ResendConfirmationEmailCard';
import ResetPasswordCard from './ResetPasswordCard';
import SigninCard from './SigninCard';
import SignupCard from './SignupCard';

const components = {
  AuthWrapper,
  UnauthWrapper,
  ResendConfirmationEmailCard,
  ResetPasswordCard,
  SigninCard,
  SignupCard,
};

export default components;
