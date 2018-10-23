// @flow

/**
 * POST on pullRequests endpoint, submit a new pull request
 *
 * API docs: https://openwebslides.github.io/documentation/#submit-a-pull-request
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { PULL_REQUESTS_ENDPOINT } from '../endpoints';

const post = (
  message: string,
  topicId: string,
  userId: string,
  token: string,
): Promise<ApiResponseData> => {
  const body = JSON.stringify({
    data: {
      type: 'pullRequests',
      attributes: {
        message,
      },
      relationships: {
        topic: {
          data: {
            id: topicId,
            type: 'topics',
          },
        },
        user: {
          data: {
            id: userId,
            type: 'users',
          },
        },
      },
    },
  });

  return new ApiRequest(httpMethods.POST)
    .addPathSegment(PULL_REQUESTS_ENDPOINT)
    .setBody(body)
    .setToken(token)
    .execute();
};

export default post;
