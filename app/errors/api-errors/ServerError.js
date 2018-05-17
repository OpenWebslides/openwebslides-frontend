// @flow
/**
 * An error caused by a server-side exception
 *
 * This error is thrown on a HTTP 500 status code response
 */

import ApiError from '../ApiError';

class ServerError extends ApiError {}

export default ServerError;
