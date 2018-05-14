// @flow
/**
 * An error caused by an unauthorized API call
 */

import ApiError from '../ApiError';

class ForbiddenError extends ApiError {
  constructor(): void {
    super('Forbidden');
  }
}

export default ForbiddenError;
