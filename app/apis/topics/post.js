// @flow
/**
 * API docs: #TODO
 */

import type { Identifier } from 'types/model';
import ApiRequest, { httpMethods, type ApiResponseData, type Token } from 'lib/ApiRequest';

import { TOPICS_ENDPOINT } from '../endpoints';

const post = (
  userId: Identifier,
  title: string,
  description: ?string,
  token: Token,
): Promise<ApiResponseData> => {
  const request = new ApiRequest();

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

  request
    .setEndpoint(TOPICS_ENDPOINT)
    .setMethod(httpMethods.POST)
    .setBody(body)
    .setToken(token);

  return request.execute();
};

export default post;
