// @flow
/**
 * An error caused by an unauthorized API call
 */

import ApiError from '../ApiError';

class ServerError extends ApiError {}

export default ServerError;
