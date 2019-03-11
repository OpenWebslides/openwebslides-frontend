// @flow

/**
 * PATCH normalized content on topics/content endpoint, update course content for a topic
 *
 * API docs: https://openwebslides.github.io/documentation/#update-topic-content
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiConnection';

import { TOPICS_ENDPOINT } from '../endpoints';

const patch = (
  id: string,
  title: ?string,
  description: ?string,
  access: ?string,
  accessToken: string,
): Promise<ApiResponseData> => {
  const body = JSON.stringify({
    data: {
      type: 'topics',
      id,
      attributes: {
        title,
        description,
        access,
      },
    },
  });

  return new ApiRequest(httpMethods.PATCH)
    .addPathSegment(TOPICS_ENDPOINT)
    .addPathSegment(id)
    .setBody(body)
    .setToken(accessToken)
    .execute();
};

export default patch;
