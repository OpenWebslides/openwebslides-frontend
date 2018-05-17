// @flow
/**
 * An error caused by an API call that is not allowed by the current user
 *
 * This error is thrown on a HTTP 403 status code response
 *
 */

import ApiError from '../ApiError';

class ForbiddenError extends ApiError {
  constructor(): void {
    super('Forbidden');
  }
}

export default ForbiddenError;
