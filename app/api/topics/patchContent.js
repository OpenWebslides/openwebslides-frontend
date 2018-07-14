// @flow
/**
 * API docs: #TODO
 */

import type { Identifier } from 'types/model';
import contentItems from 'modules/contentItems';
import ApiRequest, { httpMethods, type ApiResponseData, type ApiToken } from 'lib/ApiRequest';

import { TOPICS_ENDPOINT, TOPICS_CONTENT_ENDPOINT } from '../endpoints';

const patchContent = (
  topicId: Identifier,
  content: Array<contentItems.model.ContentItem>,
  token: ApiToken,
): Promise<ApiResponseData> => {
  const body = JSON.stringify({
    data: {
      type: 'contents',
      attributes: {
        content,
      },
    },
  });

  return new ApiRequest(httpMethods.PATCH)
    .addPathSegment(TOPICS_ENDPOINT)
    .addPathSegment(topicId)
    .addPathSegment(TOPICS_CONTENT_ENDPOINT)
    .setBody(body)
    .setToken(token)
    .execute();
};

export default patchContent;
