// @flow
/**
 * An error caused by a developer attempting to use functionality that has not yet been implemented.
 */

import ImplementationError from '../ImplementationError';

class NotYetImplementedError extends ImplementationError {
  constructor(message: ?string = null, isTranslatable: boolean = false): void {
    let newMessage: string;
    let newIsTranslatable: boolean;

    if (message == null) {
      newMessage = 'This functionality has not yet been implemented.';
      newIsTranslatable = false;
    }
    else {
      newMessage = message;
      newIsTranslatable = isTranslatable;
    }

    super(newMessage, newIsTranslatable);

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe Temporary workaround
    this.constructor = NotYetImplementedError;
    // $FlowFixMe Temporary workaround
    this.__proto__ = NotYetImplementedError.prototype;
    /* eslint-enable */
  }
}

export default NotYetImplementedError;
