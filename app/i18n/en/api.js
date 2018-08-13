// @flow

const api = {
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
  topic: {
    save: {
      pending: 'Saving...',
      success: 'Topic saved',
      failure: 'Failed to save topic',
    },
  },
};

export default api;
