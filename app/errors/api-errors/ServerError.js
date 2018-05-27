// @flow
/**
 * An error caused by an unauthorized API call
 */

import ApiError from '../ApiError';

class ServerError extends ApiError {
  constructor(message: string, isTranslatable: boolean = false): void {
    super(message, isTranslatable);

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe
    this.constructor = ServerError;
    // $FlowFixMe
    this.__proto__ = ServerError.prototype;
    /* eslint-enable */
  }
}

export default ServerError;
