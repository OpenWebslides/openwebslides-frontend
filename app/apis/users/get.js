// @flow
/**
 * API docs: https://openwebslides.github.io/documentation/#users-api
 */

import type { Identifier } from 'types/model';
import ApiRequest, { httpMethods, type ApiResponseData, type Token } from 'lib/ApiRequest';

import { USERS_ENDPOINT } from '../endpoints';

// #TODO why use ?Token here and Token everywhere else? @florian
const get = (id: Identifier, token: ?Token): Promise<ApiResponseData> => {
  const request = new ApiRequest();

  request
    .setEndpoint(USERS_ENDPOINT)
    .setMethod(httpMethods.GET)
    .setResource(id)
    .setToken(token);

  return request.execute();
};

export default get;
