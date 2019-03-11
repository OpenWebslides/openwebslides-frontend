// @flow

/**
 * GET on users/topics endpoint, get all topics authored by a certain user
 *
 * API docs: #TODO
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiConnection';

import { USERS_ENDPOINT, TOPICS_ENDPOINT } from '../endpoints';

const getAllByUserId = (userId: string, token: ?string): Promise<ApiResponseData> => {
  return new ApiRequest(httpMethods.GET)
    .addPathSegment(USERS_ENDPOINT)
    .addPathSegment(userId)
    .addPathSegment(TOPICS_ENDPOINT)
    .setToken(token)
    .execute();
};

export default getAllByUserId;
