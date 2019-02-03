// @flow

const flash = {
  NetworkError: 'A network error occurred',
  UnauthorizedError: 'Please sign in again',
  'platform/SIGNIN': {
    success: 'You have been successfully signed in.',
    error: 'Username and/or password were incorrect.',
  },
  'platform/SIGNOUT': {
    success: 'You have been succesfully signed out.',
  },
  'pullRequests/CREATE': {
    success: 'Successfully shared your contribution',
    error: 'An error occurred while sharing your contribution',
  },
  'pullRequests/ACCEPT': {
    error: 'An error occurred while accepting the contribution',
  },
  'pullRequests/REJECT': {
    error: 'An error occurred while rejecting the contribution',
  },
  'users/SIGNUP': {
    success: 'Welcome! Check your mailbox for the confirmation email.',
  },
  'users/UPDATE': {
    success: 'Your profile was successfully updated',
    error: 'An error occurred while updating your profile',
  },
  'users/UPDATE_PASSWORD': {
    success: 'Your password was successfully updated',
    error: 'An error occurred while updating your password',
  },
  // #TODO add more messages as necessary
};

export default flash;
