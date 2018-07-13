// @flow
/**
 * An error caused by an HTTP response containing an unexpected status code.
 */

import ApiError from '../ApiError';

class UnexpectedHttpStatusError extends ApiError {
  // TODO: proper structure for JSONAPI validation errors
  constructor(message: string): void {
    super(message);

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe Temporary workaround
    this.constructor = UnexpectedHttpStatusError;
    // $FlowFixMe Temporary workaround
    this.__proto__ = UnexpectedHttpStatusError.prototype;
    /* eslint-enable */
  }
}

export default UnexpectedHttpStatusError;
