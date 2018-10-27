// @flow

import errors from 'modules/errors';

export const dummyLoggedError: errors.model.LoggedError = {
  errorObject: new Error('dummy'),
  timestamp: 123456,
};

export const dummyLoggedError2: errors.model.LoggedError = {
  errorObject: new Error('dummy2'),
  timestamp: 987654,
};

export const dummyLoggedError3: errors.model.LoggedError = {
  errorObject: new Error('dummy3'),
  timestamp: 963258,
};
