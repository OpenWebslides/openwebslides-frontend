// @flow
/**
 * API docs: https://openwebslides.github.io/documentation/#token-api
 */

import * as m from '../model';
import ApiRequest from '../ApiRequest';

import { TOKEN_ENDPOINT } from './helpers/endpoints';

const post = (email: string, password: string): Promise<m.ApiResponseData> => {
  const request = new ApiRequest();

  const body = JSON.stringify({
    data: {
      type: 'tokens',
      attributes: {
        email,
        password,
      },
    },
  });

  request
    .setEndpoint(TOKEN_ENDPOINT)
    .setMethod(m.methodTypes.POST)
    .setBody(body);

  return request.execute();
};

const destroy = (token: m.Token): Promise<m.ApiResponseData> => {
  const request = new ApiRequest();

  request
    .setEndpoint(TOKEN_ENDPOINT)
    .setMethod(m.methodTypes.DELETE)
    .setToken(token);

  return request.execute();
};

const TokenApi = {
  post,
  destroy,
};

export default TokenApi;
