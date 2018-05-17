// @flow
/**
 * An error caused by server-side validation of request data
 *
 * This error is thrown on a HTTP 422 status code response
 * Details of the validation error are included in the error object
 *
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
