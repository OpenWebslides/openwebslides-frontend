// @flow
/**
 * An error caused by server-side validation of request data
 *
 * This error is thrown on a HTTP 422 status code response
 * Details of the validation error are included in the error object
 *
 */

import ApiError from '../ApiError';

class ValidationError extends ApiError {
  // TODO: proper structure for JSONAPI validation errors
}

export default ValidationError;
