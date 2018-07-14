// @flow
/**
 * API docs: #TODO
 */

import type { Identifier } from 'types/model';
import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { USERS_ENDPOINT, TOPICS_ENDPOINT } from '../endpoints';

const getAllByUserId = async (userId: Identifier): Promise<ApiResponseData> => {
  return new ApiRequest(httpMethods.GET)
    .addPathSegment(USERS_ENDPOINT)
    .addPathSegment(userId)
    .addPathSegment(TOPICS_ENDPOINT)
    .execute();
};

export default getAllByUserId;
