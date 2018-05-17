// @flow
/**
 * An error caused by an unauthorized API call
 */

import ApiError from '../ApiError';

class ForbiddenError extends ApiError {
  constructor(): void {
    super('Forbidden');

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe
    this.constructor = ForbiddenError;
    // $FlowFixMe
    this.__proto__ = ForbiddenError.prototype;
    /* eslint-enable */
  }
}

export default ForbiddenError;
