// @flow

/**
 * GET on users alerts endpoint, get all alerts
 *
 * API documentation: https://openwebslides.github.io/documentation/#get-all-user-alerts
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiConnection';

import { USERS_ENDPOINT, ALERTS_ENDPOINT } from '../endpoints';

const getAllByUserId = (userId: string, accessToken: string): Promise<ApiResponseData> => {
  return new ApiRequest(httpMethods.GET)
    .addPathSegment(USERS_ENDPOINT)
    .addPathSegment(userId)
    .addPathSegment(ALERTS_ENDPOINT)
    .setParameter('include', 'user,topic,pullRequest,subject')
    .setToken(accessToken)
    .execute();
};

export default getAllByUserId;
