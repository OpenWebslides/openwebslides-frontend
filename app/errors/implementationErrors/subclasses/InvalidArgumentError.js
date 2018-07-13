// @flow
/**
 * An error caused by a developer passing an invalid argument to a function.
 */

import ImplementationError from '../ImplementationError';

class InvalidArgumentError extends ImplementationError {
  constructor(message: string, isTranslatable: boolean = false): void {
    super(message, isTranslatable);

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe Temporary workaround
    this.constructor = InvalidArgumentError;
    // $FlowFixMe Temporary workaround
    this.__proto__ = InvalidArgumentError.prototype;
    /* eslint-enable */
  }
}

export default InvalidArgumentError;
