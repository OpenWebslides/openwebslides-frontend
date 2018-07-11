// @flow


import { methodTypes } from '../model';
import type { Response, Token } from '../model';
import ApiRequest from '../ApiRequest';

import { TOKEN_ENDPOINT } from './constants';

const post = (email: string, password: string): Promise<Response> => {
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
    .setMethod(methodTypes.POST)
    .setBody(body);

  return request.execute();
};

const destroy = (token: Token): Promise<Response> => {
  const request = new ApiRequest();

  request
    .setEndpoint(TOKEN_ENDPOINT)
    .setMethod(methodTypes.DELETE)
    .setToken(token);

  return request.execute();
};

const TokenApi = {
  post,
  destroy,
};

export default TokenApi;
