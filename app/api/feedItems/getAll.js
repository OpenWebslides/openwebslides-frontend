// @flow

/**
 * GET on feedItems endpoint, get all Recent Activity feed items
 *
 * API documentation: https://openwebslides.github.io/documentation/#get-all-feed-items
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { FEED_ITEMS_ENDPOINT } from '../endpoints';

const getAll = (): Promise<ApiResponseData> => {
  return new ApiRequest(httpMethods.GET)
    .addPathSegment(FEED_ITEMS_ENDPOINT)
    .setParameter('sort', '-createdAt')
    .setParameter('page[limit]', '10')
    .setParameter('page[offset]', '0')
    .setParameter('include', 'user')
    .execute();
};

export default getAll;
