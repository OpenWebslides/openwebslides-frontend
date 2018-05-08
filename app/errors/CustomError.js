// @flow
/**
 * Base class for custom errors.
 * Do not directly create a CustomError. Instead, use one of its more specific subclasses;
 * add a new one if necessary. (Note: please make sure to add new Error files in the appropriate
 * subfolder, since that makes it easier for future developers to understand the error hierarchy.)
 */

class CustomError extends Error {
  /**
   * TRUE if the passed error message is a translator key;
   * FALSE if the passed error message contains the literal error text.
   */
  isTranslatable: boolean;

  constructor(message: string, isTranslatable: boolean): void {
    super(message);
    this.isTranslatable = isTranslatable;
  }
}

export default CustomError;
