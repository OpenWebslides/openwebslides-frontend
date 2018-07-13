// @flow
/**
 * An error caused by an HTTP response containing a 422 status code.
 * Server-side validation of request data failed. The details are included in the error object.
 */

import ApiError from '../ApiError';

class Http422ValidationError extends ApiError {
  // TODO: proper structure for JSONAPI validation errors
  constructor(message: string, isTranslatable: boolean = false): void {
    super(message, isTranslatable);

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe Temporary workaround
    this.constructor = Http422ValidationError;
    // $FlowFixMe Temporary workaround
    this.__proto__ = Http422ValidationError.prototype;
    /* eslint-enable */
  }
}

export default Http422ValidationError;
