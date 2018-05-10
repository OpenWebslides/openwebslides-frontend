// @flow
/**
 * An error that was thrown by a remote server.
 */

import CustomError from './CustomError';

class ServerError extends CustomError {
  // ServerErrors are usually not translatable, since the remote system can't know about the local
  // translator keys.
  constructor(message: string, isTranslatable: boolean = false): void {
    super(message, isTranslatable);
  }
}

export default ServerError;
