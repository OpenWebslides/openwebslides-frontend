// @flow
/**
 * An error caused by a user attempting to view an object that doesn't exist or that they can't
 * access for security / privacy reasons.
 */

import i18next from 'config/i18next';
import UsageError from '../UsageError';

class ObjectNotFoundError extends UsageError {
  constructor(objectNameKey: string, objectId: string): void {
    const objectName = i18next.t(objectNameKey);
    const message = i18next.t('errors:usage.notFound', { objectName, objectId });
    super(message, false);
  }
}

export default ObjectNotFoundError;
