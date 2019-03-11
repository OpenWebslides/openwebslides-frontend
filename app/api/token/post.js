// @flow

/**
 * POST email and password on token on token endpoint, signs in a user (creates a token)
 *
 * API docs: https://openwebslides.github.io/documentation/#token-api
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiConnection';

import { TOKEN_ENDPOINT } from '../endpoints';

const post = (email: string, password: string): Promise<ApiResponseData> => {
  const body = JSON.stringify({
    data: {
      type: 'tokens',
      attributes: {
        email,
        password,
      },
    },
  });

  return new ApiRequest(httpMethods.POST)
    .addPathSegment(TOKEN_ENDPOINT)
    .setBody(body)
    .execute();
};

export default post;
