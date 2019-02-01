// @flow

/**
 * An error caused by a network error (connection refused, user offline).
 */

import ApiError from '../ApiError';

class NetworkError extends ApiError {
  constructor(message: ?string = null): void {
    let newMessage: string;

    if (message == null) {
      newMessage = 'Network error';
    }
    else {
      newMessage = message;
    }

    super(newMessage);

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe Temporary workaround
    this.constructor = NetworkError;
    // $FlowFixMe Temporary workaround
    this.__proto__ = NetworkError.prototype;
    /* eslint-enable */
  }
}

export default NetworkError;
