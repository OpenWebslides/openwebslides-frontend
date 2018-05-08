// @flow

import CustomError from '../CustomError';

class UsageError extends CustomError {
  constructor(message: string): void {
    super(message, true);
  }
}

export default UsageError;
