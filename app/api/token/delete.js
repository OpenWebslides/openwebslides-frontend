// @flow

/**
 * DELETE on token endpoint, invalidates all existing refresh and access tokens
 *
 * API docs: https://openwebslides.github.io/documentation/#token-api
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiConnection';

import { TOKEN_ENDPOINT } from '../endpoints';

const deleteFunction = (refreshToken: string): Promise<ApiResponseData> => {
  return new ApiRequest(httpMethods.DELETE)
    .addPathSegment(TOKEN_ENDPOINT)
    .setToken(refreshToken)
    .execute();
};

export default deleteFunction;
