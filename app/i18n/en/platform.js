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
      resendConfirmationEmail: 'Resend confirmation email',
      signinWithProvider: 'Sign in with {{provider}}',
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
  sendResetPasswordEmailCard: {
    title: 'Send reset password email',
    description: 'Enter your email address to send an email containing instructions for resetting your password.',
  },
  resendConfirmationEmailCard: {
    title: 'Resend confirmation email',
    description: 'Enter your email address to resend the email containing instructions to confirm your account.',
  },
  resetPasswordCard: {
    title: 'Reset account password',
    description: 'Enter a new password below to reset your account password.',
    button: {
      submit: 'Reset password',
    },
  },
};

export default platform;
