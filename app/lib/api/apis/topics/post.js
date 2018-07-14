// @flow
/**
 * API docs: #TODO
 */

import type { Identifier } from 'types/model';

import * as m from '../../model';
import ApiRequest from '../../ApiRequest';
import { TOPICS_ENDPOINT } from '../endpoints';

const post = (
  userId: Identifier,
  title: string,
  description: ?string,
  token: m.Token,
): Promise<m.ApiResponseData> => {
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
    .setMethod(m.methodTypes.POST)
    .setBody(body)
    .setToken(token);

  return request.execute();
};

export default post;
