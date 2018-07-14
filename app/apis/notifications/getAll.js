// @flow
/**
 * API docs: #TODO
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { NOTIFICATIONS_ENDPOINT } from '../endpoints';

const getAll = async (): Promise<ApiResponseData> => {
  const request = new ApiRequest();

  request
    .setEndpoint(NOTIFICATIONS_ENDPOINT)
    .setMethod(httpMethods.GET)
    .setParameter('sort', '-createdAt')
    .setParameter('page[limit]', '10')
    .setParameter('page[offset]', '0')
    .setParameter('include', 'user');

  return request.execute();
};

export default getAll;
