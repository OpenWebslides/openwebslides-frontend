// @flow

/**
 * API docs: #TODO
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { TOPICS_ENDPOINT } from '../endpoints';

const deleteFunction = (id: string, token: string): Promise<ApiResponseData> => {
  return new ApiRequest(httpMethods.DELETE)
    .addPathSegment(TOPICS_ENDPOINT)
    .addPathSegment(id)
    .setToken(token)
    .execute();
};

export default deleteFunction;
