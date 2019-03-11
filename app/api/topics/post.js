// @flow

/**
 * POST on topics endpoint, create a new topic
 *
 * API docs: https://openwebslides.github.io/documentation/#create-a-topic
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiConnection';

import { TOPICS_ENDPOINT } from '../endpoints';

const post = (
  title: string,
  description: ?string,
  rootContentItemId: string,
  userId: string,
  accessToken: string,
): Promise<ApiResponseData> => {
  const body = JSON.stringify({
    data: {
      type: 'topics',
      attributes: {
        title,
        access: 'public', // TODO: change when private topics can be created
        description,
        rootContentItemId,
      },
      relationships: {
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
    .addPathSegment(TOPICS_ENDPOINT)
    .setBody(body)
    .setToken(accessToken)
    .execute();
};

export default post;
