// @flow
/**
 * An error caused by an unauthorized API call
 */

import ApiError from '../ApiError';

class ValidationError extends ApiError {
  // TODO: proper structure for JSONAPI validation errors
  constructor(message: string, isTranslatable: boolean = false): void {
    super(message, isTranslatable);

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe
    this.constructor = ValidationError;
    // $FlowFixMe
    this.__proto__ = ValidationError.prototype;
    /* eslint-enable */
  }
}

export default ValidationError;
