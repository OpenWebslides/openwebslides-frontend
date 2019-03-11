// @flow

/**
 * DELETE on topics endpoint, deletes a topic
 *
 * API documentation: https://openwebslides.github.io/documentation/#delete-a-topic
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiConnection';

import { TOPICS_ENDPOINT } from '../endpoints';

const deleteFunction = (id: string, accessToken: ?string): Promise<ApiResponseData> => {
  return new ApiRequest(httpMethods.DELETE)
    .addPathSegment(TOPICS_ENDPOINT)
    .addPathSegment(id)
    .setToken(accessToken)
    .execute();
};

export default deleteFunction;
