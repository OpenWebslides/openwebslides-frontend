// @flow

/**
 * POST on pullRequests endpoint, submit a new pull request
 *
 * API docs: https://openwebslides.github.io/documentation/#submit-a-pull-request
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiConnection';

import { PULL_REQUESTS_ENDPOINT } from '../endpoints';

const post = (
  message: string,
  sourceTopicId: string,
  targetTopicId: string,
  userId: string,
  accessToken: ?string,
): Promise<ApiResponseData> => {
  const body = JSON.stringify({
    data: {
      type: 'pullRequests',
      attributes: {
        message,
      },
      relationships: {
        source: {
          data: {
            id: sourceTopicId,
            type: 'topics',
          },
        },
        target: {
          data: {
            id: targetTopicId,
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
    .setToken(accessToken)
    .execute();
};

export default post;
