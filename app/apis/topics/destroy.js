// @flow
/**
 * API docs: #TODO
 */

import type { Identifier } from 'types/model';
import ApiRequest, { httpMethods, type ApiResponseData, type Token } from 'lib/ApiRequest';

import { TOPICS_ENDPOINT } from '../endpoints';

const destroy = (id: Identifier, token: Token): Promise<ApiResponseData> => {
  const request = new ApiRequest();

  request
    .setEndpoint(TOPICS_ENDPOINT)
    .setMethod(httpMethods.DELETE)
    .setResource(id)
    .setToken(token);

  return request.execute();
};

export default destroy;
