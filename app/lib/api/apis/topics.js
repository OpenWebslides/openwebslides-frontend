// @flow

import type { Identifier } from 'types/model';

import contentItemsModule from 'modules/content-items';

import {
  USERS_ENDPOINT,
  TOPICS_ENDPOINT,
  TOPICS_CONTENT_ENDPOINT,
} from './constants';

import { methodTypes } from '../model';
import type { Response, Token } from '../model';

import ApiRequest from '../ApiRequest';

const { ContentItem } = contentItemsModule.model;

const destroy = (
  id: Identifier,
  token: Token,
): Promise<Response> => {
  const request = new ApiRequest();

  request
    .setEndpoint(TOPICS_ENDPOINT)
    .setMethod(methodTypes.DELETE)
    .setResource(id)
    .setToken(token);

  return request.execute();
};

const get = async (
  id: Identifier,
): Promise<Response> => {
  const request = new ApiRequest();

  request
    .setEndpoint(TOPICS_ENDPOINT)
    .setMethod(methodTypes.GET)
    .setResource(id)
    .setParameter('include', 'user');

  return request.execute();
};

const getAllByUserId = async (
  userId: Identifier,
): Promise<Response> => {
  const request = new ApiRequest();

  request
    .setEndpoint(USERS_ENDPOINT)
    .setResource(userId)
    .setSubEndpoint(TOPICS_ENDPOINT)
    .setMethod(methodTypes.GET);

  return request.execute();
};

const post = (
  userId: Identifier,
  title: string,
  description: ?string,
  token: Token,
): Promise<Response> => {
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
    .setMethod(methodTypes.POST)
    .setBody(body)
    .setToken(token);

  return request.execute();
};

const patchContent = (
  topicId: Identifier,
  contentItems: Array<ContentItem>,
  token: string,
): Promise<Response> => {
  const request = new ApiRequest();

  const body = JSON.stringify({
    data: {
      type: 'contents',
      attributes: {
        content: contentItems,
      },
    },
  });

  request
    .setEndpoint(TOPICS_ENDPOINT)
    .setResource(topicId)
    .setSubEndpoint(TOPICS_CONTENT_ENDPOINT)
    .setMethod(methodTypes.PATCH)
    .setBody(body)
    .setToken(token);

  return request.execute();
};

const getContent = (
  topicId: Identifier,
  token: string,
): Promise<Response> => {
  const request = new ApiRequest();

  request
    .setEndpoint(TOPICS_ENDPOINT)
    .setResource(topicId)
    .setSubEndpoint(TOPICS_CONTENT_ENDPOINT)
    .setMethod(methodTypes.GET)
    .setToken(token);

  return request.execute();
};

const TopicsApi = {
  destroy,
  get,
  getAllByUserId,
  post,
  patchContent,
  getContent,
};

export default TopicsApi;
