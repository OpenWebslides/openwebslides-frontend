// @flow
/**
 * API docs: #TODO
 */

import type { Identifier } from 'types/model';

import * as m from '../../model';
import ApiRequest from '../../ApiRequest';
import { TOPICS_ENDPOINT, TOPICS_CONTENT_ENDPOINT } from '../endpoints';

const getContent = (topicId: Identifier, token: string): Promise<m.ApiResponseData> => {
  const request = new ApiRequest();

  request
    .setEndpoint(TOPICS_ENDPOINT)
    .setResource(topicId)
    .setSubEndpoint(TOPICS_CONTENT_ENDPOINT)
    .setMethod(m.httpMethods.GET)
    .setToken(token);

  return request.execute();
};

export default getContent;
