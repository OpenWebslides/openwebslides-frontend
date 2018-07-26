// @flow

/**
 * An error caused by an HTTP response containing a 5xx status code.
 * A server-side exception occurred.
 */

import ApiError from '../ApiError';

class Http5xxServerError extends ApiError {
  constructor(message: string, isTranslatable: boolean = false): void {
    super(message, isTranslatable);

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe Temporary workaround
    this.constructor = Http5xxServerError;
    // $FlowFixMe Temporary workaround
    this.__proto__ = Http5xxServerError.prototype;
    /* eslint-enable */
  }
}

export default Http5xxServerError;
