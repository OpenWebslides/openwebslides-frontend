// @flow
/**
 * An error caused by a developer misusing existing code.
 */

import CustomError from './CustomError';

class ImplementationError extends CustomError {
  // Implementation errors are usually not translatable, since they are only meant for developers
  // and should not be shown to the user.
  constructor(message: string, isTranslatable: boolean = false): void {
    super(message, isTranslatable);

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe
    this.constructor = ImplementationError;
    // $FlowFixMe
    this.__proto__ = ImplementationError.prototype;
    /* eslint-enable */
  }
}

export default ImplementationError;
