// @flow
/**
 * API docs: https://openwebslides.github.io/documentation/#token-api
 */

import ApiRequest, { httpMethods, type ApiResponseData, type ApiToken } from 'lib/ApiRequest';

import { TOKEN_ENDPOINT } from '../endpoints';

const deleteFunction = (token: ApiToken): Promise<ApiResponseData> => {
  return new ApiRequest(httpMethods.DELETE)
    .addPathSegment(TOKEN_ENDPOINT)
    .setToken(token)
    .execute();
};

export default deleteFunction;
