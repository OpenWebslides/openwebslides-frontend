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
  const request = new ApiRequest();

  const body = JSON.stringify({
    data: {
      type: 'contents',
      attributes: {
        content,
      },
    },
  });

  request
    .setEndpoint(TOPICS_ENDPOINT)
    .setResource(topicId)
    .setSubEndpoint(TOPICS_CONTENT_ENDPOINT)
    .setMethod(httpMethods.PATCH)
    .setBody(body)
    .setToken(token);

  return request.execute();
};

export default patchContent;
