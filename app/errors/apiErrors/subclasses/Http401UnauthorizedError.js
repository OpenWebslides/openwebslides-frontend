// @flow

/**
 * An error caused by an HTTP response containing a 401 status code.
 * The user made an API call that is not allowed without being authenticated.
 */

import ApiError from '../ApiError';

class Http401UnauthorizedError extends ApiError {
  constructor(): void {
    super('Unauthorized');

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe Temporary workaround
    this.constructor = Http401UnauthorizedError;
    // $FlowFixMe Temporary workaround
    this.__proto__ = Http401UnauthorizedError.prototype;
    /* eslint-enable */
  }
}

export default Http401UnauthorizedError;
