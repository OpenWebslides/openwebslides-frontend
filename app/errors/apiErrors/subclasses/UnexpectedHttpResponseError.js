// @flow

/**
 * An error caused by an empty HTTP response body where a response body was expected.
 */

import ApiError from '../ApiError';

class UnexpectedHttpResponseError extends ApiError {
  constructor(message: ?string = null): void {
    let newMessage: string;

    if (message == null) {
      newMessage = 'Unexpected empty response data';
    }
    else {
      newMessage = message;
    }

    super(newMessage);

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe Temporary workaround
    this.constructor = UnexpectedHttpResponseError;
    // $FlowFixMe Temporary workaround
    this.__proto__ = UnexpectedHttpResponseError.prototype;
    /* eslint-enable */
  }
}

export default UnexpectedHttpResponseError;
