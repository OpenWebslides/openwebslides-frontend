// @flow

/**
 * POST on topics fork endpoint, forks a topic
 *
 * API docs: https://openwebslides.github.io/documentation/#fork-a-topic
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { TOPICS_ENDPOINT, TOPICS_FORK_ENDPOINT } from '../endpoints';

const postFork = (
  id: string,
  token: string,
): Promise<ApiResponseData> => {
  return new ApiRequest(httpMethods.POST)
    .addPathSegment(TOPICS_ENDPOINT)
    .addPathSegment(id)
    .addPathSegment(TOPICS_FORK_ENDPOINT)
    .setToken(token)
    .execute();
};

export default postFork;
