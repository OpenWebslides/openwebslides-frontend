// @flow
/**
 * An error that was thrown by a remote server.
 *
 * This error is thrown on a HTTP 4xx status code response
 *
 */

import CustomError from './CustomError';

class ApiError extends CustomError {
  // ApiErrors are usually not translatable, since the remote system can't know about the local
  // translator keys.
  constructor(message: string, isTranslatable: boolean = false): void {
    super(message, isTranslatable);
  }
}

export default ApiError;
