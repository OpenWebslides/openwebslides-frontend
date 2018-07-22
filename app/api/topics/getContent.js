// @flow
/**
 * API docs: #TODO
 */

import type { Identifier } from 'types/model';
import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { TOPICS_ENDPOINT, TOPICS_CONTENT_ENDPOINT } from '../endpoints';

const getContent = (topicId: Identifier, token: string): Promise<ApiResponseData> => {
  return new ApiRequest(httpMethods.GET)
    .addPathSegment(TOPICS_ENDPOINT)
    .addPathSegment(topicId)
    .addPathSegment(TOPICS_CONTENT_ENDPOINT)
    .setToken(token)
    .execute();
};

export default getContent;
