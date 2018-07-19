// @flow
/**
 * API docs: https://openwebslides.github.io/documentation/#token-api
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { TOKEN_ENDPOINT } from '../endpoints';

const postSignin = (email: string, password: string): Promise<ApiResponseData> => {
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

export default postSignin;
