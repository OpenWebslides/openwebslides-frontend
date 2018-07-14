// @flow
/**
 * API docs: https://openwebslides.github.io/documentation/#users-api
 */

import type { Identifier } from 'types/model';
import ApiRequest, { httpMethods, type ApiResponseData, type ApiToken } from 'lib/ApiRequest';

import { USERS_ENDPOINT } from '../endpoints';

// #TODO why use ?Token here and Token everywhere else? @florian
const get = (id: Identifier, token: ?ApiToken): Promise<ApiResponseData> => {
  return new ApiRequest(httpMethods.GET)
    .addPathSegment(USERS_ENDPOINT)
    .addPathSegment(id)
    .setToken(token)
    .execute();
};

export default get;
