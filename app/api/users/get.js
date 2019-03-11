// @flow

/**
 * GET on users endpoint, retrieve a user
 *
 * API docs: https://openwebslides.github.io/documentation/#users-api
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiConnection';

import { USERS_ENDPOINT } from '../endpoints';

const get = (id: string, token: ?string): Promise<ApiResponseData> => {
  return new ApiRequest(httpMethods.GET)
    .addPathSegment(USERS_ENDPOINT)
    .addPathSegment(id)
    .setParameter('include', 'topics')
    .setToken(token)
    .execute();
};

export default get;
