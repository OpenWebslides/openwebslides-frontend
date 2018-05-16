// @flow
/**
 * An error caused by an unauthorized API call
 */

import ApiError from '../ApiError';

class UnauthorizedError extends ApiError {
  constructor(): void {
    super('Unauthorized');
  }
}

export default UnauthorizedError;
