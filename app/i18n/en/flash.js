// @flow

const flash = {
  'platform/SIGNIN': {
    success: 'You have been successfully signed in.',
    error: 'Username and/or password were incorrect.',
  },
  'platform/SIGNOUT': {
    success: 'You have been succesfully signed out.',
    error: 'An error occurred during signout.',
  },
  'pullRequests/CREATE': {
    success: 'Successfully shared the changes.',
    error: 'An error occurred while sharing the changes.',
  },
  // #TODO add more messages as necessary
};

export default flash;
