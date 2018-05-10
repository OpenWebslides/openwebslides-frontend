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
  }
}

export default ImplementationError;
