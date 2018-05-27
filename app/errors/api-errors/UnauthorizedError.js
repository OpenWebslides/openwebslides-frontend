// @flow
/**
 * An error caused by an unauthorized API call
 */

import ApiError from '../ApiError';

class UnauthorizedError extends ApiError {
  constructor(): void {
    super('Unauthorized');

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe
    this.constructor = UnauthorizedError;
    // $FlowFixMe
    this.__proto__ = UnauthorizedError.prototype;
    /* eslint-enable */
  }
}

export default UnauthorizedError;
