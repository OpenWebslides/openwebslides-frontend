// @flow

/**
 * An error caused by an HTTP response containing a 403 status code.
 * The user made an API call that they are not allowed to make.
 */

import ApiError from '../ApiError';

class Http403ForbiddenError extends ApiError {
  constructor(): void {
    super('Forbidden');

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe Temporary workaround
    this.constructor = Http403ForbiddenError;
    // $FlowFixMe Temporary workaround
    this.__proto__ = Http403ForbiddenError.prototype;
    /* eslint-enable */
  }
}

export default Http403ForbiddenError;
