// @flow
/**
 * An error caused by a user taking an invalid action.
 */

import CustomError from '../CustomError';

class UsageError extends CustomError {
  // UsageErrors should always be translatable, since they need to be displayed to the user.
  // However, subclasses might use custom translation logic and then set the default to FALSE.
  constructor(message: string, isTranslatable: boolean = true): void {
    super(message, isTranslatable);

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe Temporary workaround
    this.constructor = UsageError;
    // $FlowFixMe Temporary workaround
    this.__proto__ = UsageError.prototype;
    /* eslint-enable */
  }
}

export default UsageError;
