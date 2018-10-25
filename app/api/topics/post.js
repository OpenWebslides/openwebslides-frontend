// @flow

/**
 * POST on topics endpoint, create a new topic
 *
 * API docs: https://openwebslides.github.io/documentation/#create-a-topic
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { TOPICS_ENDPOINT } from '../endpoints';

const post = (
  title: string,
  rootContentItemId: string,
  userId: string,
  token: string,
  attributes: {
    description?: ?string,
  },
): Promise<ApiResponseData> => {
  const body = JSON.stringify({
    data: {
      type: 'topics',
      attributes: {
        ...attributes,
        title,
        state: 'public_access', // TODO: change when private topics can be created
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
    .setToken(token)
    .execute();
};

export default post;
