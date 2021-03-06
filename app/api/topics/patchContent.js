// @flow

/**
 * PATCH normalized content on topics/content endpoint, update course content for a topic
 *
 * API docs: https://openwebslides.github.io/documentation/#update-topic-content
 */

import contentItems from 'modules/contentItems';
import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiConnection';

import { TOPICS_ENDPOINT, TOPICS_CONTENT_ENDPOINT } from '../endpoints';

const patchContent = (
  id: string,
  content: $ReadOnlyArray<contentItems.model.ContentItem>,
  message: string,
  accessToken: ?string,
): Promise<ApiResponseData> => {
  const body = JSON.stringify({
    data: {
      type: 'contents',
      attributes: {
        content,
        message,
      },
    },
  });

  return new ApiRequest(httpMethods.PATCH)
    .addPathSegment(TOPICS_ENDPOINT)
    .addPathSegment(id)
    .addPathSegment(TOPICS_CONTENT_ENDPOINT)
    .setBody(body)
    .setToken(accessToken)
    .execute();
};

export default patchContent;
