// @flow
/**
 * An error caused by an API call that is not allowed unauthenticated
 *
 * This error is thrown on a HTTP 401 status code response
 *
 */

import ApiError from '../ApiError';

class UnauthorizedError extends ApiError {
  constructor(): void {
    super('Unauthorized');
  }
}

export default UnauthorizedError;
