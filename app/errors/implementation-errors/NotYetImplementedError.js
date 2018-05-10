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
  }
}

export default NotYetImplementedError;
