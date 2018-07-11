// @flow
/**
 * An error caused by a user attempting to view an object that doesn't exist or that they can't
 * access for security / privacy reasons.
 */

import i18next from 'config/i18next';

import UsageError from '../UsageError';

class ObjectNotFoundError extends UsageError {
  /**
   * ObjectNotFound always has the same type of error message, so we only pass the changeable parts.
   *
   * @param objectNameKey Translator key for the name of the type of object that was not found
   * @param objectId      Invalid id that caused the error
   */
  constructor(objectNameKey: string, objectId: string): void {
    const objectName = i18next.t(objectNameKey);
    const message = i18next.t('errors:usage.notFound', { objectName, objectId });
    super(message, false);

    // Temporary workaround for https://github.com/istanbuljs/babel-plugin-istanbul/issues/143 #TODO
    /* eslint-disable no-proto */
    // $FlowFixMe Temporary workaround
    this.constructor = ObjectNotFoundError;
    // $FlowFixMe Temporary workaround
    this.__proto__ = ObjectNotFoundError.prototype;
    /* eslint-enable */
  }
}

export default ObjectNotFoundError;
