// @flow
/**
 * An error caused by a user taking an invalid action.
 */

import CustomError from '../CustomError';

class UsageError extends CustomError {
  constructor(message: string): void {
    // UsageErrors should always be translatable, since they need to be displayed to the user.
    super(message, true);
  }
}

export default UsageError;
