// @flow
/**
 * API docs: https://openwebslides.github.io/documentation/#token-api
 */

import * as m from '../../model';
import ApiRequest from '../../ApiRequest';
import { TOKEN_ENDPOINT } from '../endpoints';

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
    .setMethod(m.httpMethods.POST)
    .setBody(body);

  return request.execute();
};

export default post;
