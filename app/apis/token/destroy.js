// @flow
/**
 * API docs: https://openwebslides.github.io/documentation/#token-api
 */

import ApiRequest, { httpMethods, type ApiResponseData, type Token } from 'lib/ApiRequest';

import { TOKEN_ENDPOINT } from '../endpoints';

const destroy = (token: Token): Promise<ApiResponseData> => {
  const request = new ApiRequest();

  request
    .setEndpoint(TOKEN_ENDPOINT)
    .setMethod(httpMethods.DELETE)
    .setToken(token);

  return request.execute();
};

export default destroy;
