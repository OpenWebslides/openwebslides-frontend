// @flow
/**
 * An error caused by an unauthorized API call
 */

import ApiError from '../ApiError';

class ValidationError extends ApiError {
  // TODO: proper structure for JSONAPI validation errors
}

export default ValidationError;
