// @flow

/**
 * API docs: #TODO
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { TOPICS_ENDPOINT } from '../endpoints';

const get = (id: string): Promise<ApiResponseData> => {
  return new ApiRequest(httpMethods.GET)
    .addPathSegment(TOPICS_ENDPOINT)
    .addPathSegment(id)
    .setParameter('include', 'user')
    .execute();
};

export default get;
