// @flow

import CustomError from '../CustomError';

class ServerError extends CustomError {
  constructor(message: string, isTranslatable: boolean = false): void {
    super(message, isTranslatable);
  }
}

export default ServerError;
