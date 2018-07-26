// @flow

/**
 * API docs: #TODO
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
