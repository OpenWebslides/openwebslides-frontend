// @flow

/**
 * An error caused by the internal state of the application having become corrupted somehow.
 */

import ImplementationError from '../ImplementationError';

class CorruptedInternalStateError extends ImplementationError {
  constructor(message: string, isTranslatable: boolean = false): void {
    super(message, isTranslatable);

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe
    this.constructor = CorruptedInternalStateError;
    // $FlowFixMe
    this.__proto__ = CorruptedInternalStateError.prototype;
    /* eslint-enable */
  }
}

export default CorruptedInternalStateError;
