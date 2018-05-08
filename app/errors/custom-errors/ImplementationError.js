// @flow

import CustomError from '../CustomError';

class ImplementationError extends CustomError {
  constructor(message: string): void {
    super(message, true);
  }
}

export default ImplementationError;
