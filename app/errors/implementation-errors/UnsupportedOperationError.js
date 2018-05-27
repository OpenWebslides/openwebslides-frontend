// @flow
/**
 * An error caused by a developer attempting to use functionality in a way that was not intended.
 */

import ImplementationError from '../ImplementationError';

class UnsupportedOperationError extends ImplementationError {
  constructor(message: string, isTranslatable: boolean = false): void {
    super(message, isTranslatable);

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe
    this.constructor = UnsupportedOperationError;
    // $FlowFixMe
    this.__proto__ = UnsupportedOperationError.prototype;
    /* eslint-enable */
  }
}

export default UnsupportedOperationError;
