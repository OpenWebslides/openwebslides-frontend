// @flow

/**
 * PATCH email on token endpoint, requests an access token
 *
 * API docs: https://openwebslides.github.io/documentation/#token-api
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiConnection';

import { TOKEN_ENDPOINT } from '../endpoints';

const patch = (email: string, refreshToken: string): Promise<ApiResponseData> => {
  const body = JSON.stringify({
    data: {
      type: 'tokens',
      attributes: {
        email,
      },
    },
  });

  return new ApiRequest(httpMethods.PATCH)
    .addPathSegment(TOKEN_ENDPOINT)
    .setToken(refreshToken)
    .setBody(body)
    .execute();
};

export default patch;
