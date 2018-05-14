// @flow
/**
 * Base class for custom errors.
 * Do not directly create a CustomError. Instead, use one of its more specific subclasses;
 * add a new one if necessary. (Note: please make sure to add new Error files in the appropriate
 * subfolder, since that makes it easier for future developers to understand the error hierarchy.)
 */

import i18next from 'config/i18next';

class CustomError extends Error {
  /**
   * @param message         The error message
   * @param isTranslatable  TRUE if `message` is a translator key, FALSE if not.
   */
  constructor(message: string, isTranslatable: boolean): void {
    let newMessage: string;

    if (isTranslatable) newMessage = i18next.t(message);
    else newMessage = message;

    super(newMessage);
  }
}

export default CustomError;
