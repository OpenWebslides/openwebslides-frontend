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
  api: {
    confirmation: {
      post: {
        success: 'Resent an email with confirmation instructions. Check your inbox!',
        failure: 'Failed to resend an email with confirmation instructions',
      },
      patch: {
        success: 'Successfully confirmed your email address. You can now sign in!',
        failure: 'Failed to confirm your email address',
      },
    },
    password: {
      post: {
        success: 'Sent an email with password reset instructions. Check your inbox!',
        failure: 'Failed to send an email with password reset instructions',
      },
      patch: {
        success: 'Successfully reset your password. You can now sign in using your new password!',
        failure: 'Failed to reset your account password.',
      },
    },
  },
};

export default platform;
