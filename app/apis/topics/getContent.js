// @flow
/**
 * API docs: #TODO
 */

import type { Identifier } from 'types/model';
import ApiRequest, { httpMethods, type ApiResponseData, type ApiToken } from 'lib/ApiRequest';

import { TOPICS_ENDPOINT, TOPICS_CONTENT_ENDPOINT } from '../endpoints';

const getContent = (topicId: Identifier, token: ApiToken): Promise<ApiResponseData> => {
  const request = new ApiRequest();

  request
    .setEndpoint(TOPICS_ENDPOINT)
    .setResource(topicId)
    .setSubEndpoint(TOPICS_CONTENT_ENDPOINT)
    .setMethod(httpMethods.GET)
    .setToken(token);

  return request.execute();
};

export default getContent;
