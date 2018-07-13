// @flow
/**
 * An error caused by an HTTP response containing a 4xx or 5xx status code.
 */

import CustomError from '../CustomError';

class ApiError extends CustomError {
  // ApiErrors are usually not translatable, since the remote system can't know about the local
  // translator keys.
  constructor(message: string, isTranslatable: boolean = false): void {
    super(message, isTranslatable);

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe Temporary workaround
    this.constructor = ApiError;
    // $FlowFixMe Temporary workaround
    this.__proto__ = ApiError.prototype;
    /* eslint-enable */
  }
}

export default ApiError;
