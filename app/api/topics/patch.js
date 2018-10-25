// @flow

/**
 * PATCH topics endpoint, update topic information
 *
 * API docs: https://openwebslides.github.io/documentation/#update-a-topic
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { TOPICS_ENDPOINT } from '../endpoints';

const patch = (
  id: string,
  token: string,
  attributes: {
    title?: string,
    description?: ?string,
  },
): Promise<ApiResponseData> => {
  const body = JSON.stringify({
    data: {
      type: 'topics',
      attributes: {
        ...attributes,
      },
    },
  });

  return new ApiRequest(httpMethods.PATCH)
    .addPathSegment(TOPICS_ENDPOINT)
    .addPathSegment(id)
    .setBody(body)
    .setToken(token)
    .execute();
};

export default patch;
