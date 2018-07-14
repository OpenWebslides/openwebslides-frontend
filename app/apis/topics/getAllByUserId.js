// @flow
/**
 * API docs: #TODO
 */

import type { Identifier } from 'types/model';
import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { USERS_ENDPOINT, TOPICS_ENDPOINT } from '../endpoints';

const getAllByUserId = async (userId: Identifier): Promise<ApiResponseData> => {
  const request = new ApiRequest();

  request
    .setEndpoint(USERS_ENDPOINT)
    .setResource(userId)
    .setSubEndpoint(TOPICS_ENDPOINT)
    .setMethod(httpMethods.GET);

  return request.execute();
};

export default getAllByUserId;
