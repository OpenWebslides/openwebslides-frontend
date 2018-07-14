// @flow
/**
 * API docs: https://openwebslides.github.io/documentation/#token-api
 */

import * as m from '../../model';
import ApiRequest from '../../ApiRequest';
import { TOKEN_ENDPOINT } from '../helpers/endpoints';

const destroy = (token: m.Token): Promise<m.ApiResponseData> => {
  const request = new ApiRequest();

  request
    .setEndpoint(TOKEN_ENDPOINT)
    .setMethod(m.methodTypes.DELETE)
    .setToken(token);

  return request.execute();
};

export default destroy;
