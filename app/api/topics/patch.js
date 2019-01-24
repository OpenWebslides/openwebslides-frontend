// @flow

/**
 * PATCH normalized content on topics/content endpoint, update course content for a topic
 *
 * API docs: https://openwebslides.github.io/documentation/#update-topic-content
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { TOPICS_ENDPOINT } from '../endpoints';

const patch = (
  id: string,
  title: ?string,
  description: ?string,
  token: string,
): Promise<ApiResponseData> => {
  const body = JSON.stringify({
    data: {
      type: 'topics',
      id,
      attributes: {
        title,
        description,
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
