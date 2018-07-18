// @flow

const platform = {
  signinCard: {
    title: 'Sign in',
    description: 'Sign in to continue to Open Webslides.',
    button: {
      submit: 'Sign in',
    },
    link: {
      signup: 'Sign up',
      forgotPassword: 'Forgot password?',
      confirmEmail: 'Resend confirmation email',
    },
    // request: {
    //   pending: 'Signing in...',
    //   failure: 'Invalid username or password', // #TODO
    // },
  },
  signupCard: {
    title: 'Sign up',
    description: 'Sign up to start using Open Webslides.',
    button: {
      submit: 'Sign up',
    },
    link: {
      signin: 'Sign in',
    },
  },
  resetPasswordCard: {
    title: 'Reset password',
    description: 'Enter your email address to reset your password.',
  },
  confirmEmailCard: {
    title: 'Confirm email',
    description: 'Enter your email address to resend the confirmation email.',
  },
};

export default platform;
