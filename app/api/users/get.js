// @flow

/**
 * API docs: https://openwebslides.github.io/documentation/#users-api
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { USERS_ENDPOINT } from '../endpoints';

const get = (id: string, token: ?string): Promise<ApiResponseData> => {
  return new ApiRequest(httpMethods.GET)
    .addPathSegment(USERS_ENDPOINT)
    .addPathSegment(id)
    .setToken(token)
    .execute();
};

export default get;
