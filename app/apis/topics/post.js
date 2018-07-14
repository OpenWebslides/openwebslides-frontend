// @flow
/**
 * API docs: #TODO
 */

import type { Identifier } from 'types/model';
import ApiRequest, { httpMethods, type ApiResponseData, type ApiToken } from 'lib/ApiRequest';

import { TOPICS_ENDPOINT } from '../endpoints';

const post = (
  userId: Identifier,
  title: string,
  description: ?string,
  token: ApiToken,
): Promise<ApiResponseData> => {
  const body = JSON.stringify({
    data: {
      type: 'topics',
      attributes: {
        title,
        state: 'public_access', // TODO: change when private topics can be created
        description,
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
