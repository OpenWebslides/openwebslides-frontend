// @flow

class CustomError extends Error {
  isTranslatable: boolean;

  constructor(message: string, isTranslatable: boolean): void {
    super(message);
    this.isTranslatable = isTranslatable;
  }
}

export default CustomError;
