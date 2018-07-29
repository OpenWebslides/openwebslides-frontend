// @flow

/**
 * An error caused by an empty HTTP response body where a response body was expected.
 */

import ApiError from '../ApiError';

class UnexpectedEmptyResponseError extends ApiError {
  constructor(message: string): void {
    super(message);

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe Temporary workaround
    this.constructor = UnexpectedEmptyResponseError;
    // $FlowFixMe Temporary workaround
    this.__proto__ = UnexpectedEmptyResponseError.prototype;
    /* eslint-enable */
  }
}

export default UnexpectedEmptyResponseError;
