// @flow

import Api from 'lib/api';
import type { Identifier } from 'types/model';

import { ENDPOINT } from './constants';

const { methodTypes, Response } = Api.model;
const { ApiRequest } = Api;

const destroy = (
  id: Identifier,
  token: string,
): Promise<Response> => {
  const request = new ApiRequest();

  request
    .setEndpoint(ENDPOINT)
    .setMethod(methodTypes.DELETE)
    .setResource(id)
    .setToken(token);

  return request.execute();
};

const fetch = async (): Promise<Response> => {
  const request = new ApiRequest();

  request
    .setEndpoint(ENDPOINT)
    .setMethod(methodTypes.GET);

  return request.execute();
};

const get = async (
  id: Identifier,
): Promise<Response> => {
  const request = new ApiRequest();

  request
    .setEndpoint(ENDPOINT)
    .setMethod(methodTypes.GET)
    .setResource(id);

  return request.execute();
};

const post = (
  userId: Identifier,
  title: string,
  description: ?string,
  token: string,
): Promise<Response> => {
  const request = new ApiRequest();

  const body = JSON.stringify({
    data: {
      type: 'topics',
      attributes: {
        title,
        state: 'public_access',
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
    .setEndpoint(ENDPOINT)
    .setMethod(methodTypes.POST)
    .setBody(body)
    .setToken(token);

  return request.execute();
};

const TopicApi = {
  destroy,
  fetch,
  get,
  post,
};

export default TopicApi;
