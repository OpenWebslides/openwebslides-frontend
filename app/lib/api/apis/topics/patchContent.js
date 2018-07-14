// @flow
/**
 * API docs: #TODO
 */

import type { Identifier } from 'types/model';
import contentItems from 'modules/contentItems';

import * as m from '../../model';
import ApiRequest from '../../ApiRequest';
import { TOPICS_ENDPOINT, TOPICS_CONTENT_ENDPOINT } from '../helpers/endpoints';

const patchContent = (
  topicId: Identifier,
  content: Array<contentItems.model.ContentItem>,
  token: string,
): Promise<m.ApiResponseData> => {
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
    .setMethod(m.methodTypes.PATCH)
    .setBody(body)
    .setToken(token);

  return request.execute();
};

export default patchContent;
