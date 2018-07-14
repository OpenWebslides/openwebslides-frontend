// @flow
/**
 * API docs: #TODO
 */

import type { Identifier } from 'types/model';

import * as m from '../../model';
import ApiRequest from '../../ApiRequest';
import { USERS_ENDPOINT, TOPICS_ENDPOINT } from '../endpoints';

const getAllByUserId = async (userId: Identifier): Promise<m.ApiResponseData> => {
  const request = new ApiRequest();

  request
    .setEndpoint(USERS_ENDPOINT)
    .setResource(userId)
    .setSubEndpoint(TOPICS_ENDPOINT)
    .setMethod(m.httpMethods.GET);

  return request.execute();
};

export default getAllByUserId;
