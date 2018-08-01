// @flow

/**
 * GET on notifications endpoint, get all notifications (events) for the recent activity feed
 *
 * API documentation: https://openwebslides.github.io/documentation/#get-all-notifications
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { NOTIFICATIONS_ENDPOINT } from '../endpoints';

const getAll = (): Promise<ApiResponseData> => {
  return new ApiRequest(httpMethods.GET)
    .addPathSegment(NOTIFICATIONS_ENDPOINT)
    .setParameter('sort', '-createdAt')
    .setParameter('page[limit]', '10')
    .setParameter('page[offset]', '0')
    .setParameter('include', 'user')
    .execute();
};

export default getAll;
