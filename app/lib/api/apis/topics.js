// @flow
/**
 * API docs: #TODO
 */

import type { Identifier } from 'types/model';
import contentItems from 'modules/contentItems';

import * as m from '../model';
import ApiRequest from '../ApiRequest';

import { USERS_ENDPOINT, TOPICS_ENDPOINT, TOPICS_CONTENT_ENDPOINT } from './helpers/endpoints';

const destroy = (
  id: Identifier,
  token: m.Token,
): Promise<m.ApiResponseData> => {
  const request = new ApiRequest();

  request
    .setEndpoint(TOPICS_ENDPOINT)
    .setMethod(m.methodTypes.DELETE)
    .setResource(id)
    .setToken(token);

  return request.execute();
};

const get = async (
  id: Identifier,
): Promise<m.ApiResponseData> => {
  const request = new ApiRequest();

  request
    .setEndpoint(TOPICS_ENDPOINT)
    .setMethod(m.methodTypes.GET)
    .setResource(id)
    .setParameter('include', 'user');

  return request.execute();
};

const getAllByUserId = async (
  userId: Identifier,
): Promise<m.ApiResponseData> => {
  const request = new ApiRequest();

  request
    .setEndpoint(USERS_ENDPOINT)
    .setResource(userId)
    .setSubEndpoint(TOPICS_ENDPOINT)
    .setMethod(m.methodTypes.GET);

  return request.execute();
};

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

const patchContent = (
  topicId: Identifier,
  content: Array<contentItems.model.ContentItem>,
  token: string,
): Promise<m.ApiResponseData> => {
  const request = new ApiRequest();

  const body = JSON.stringify({
    data: {
      type: 'contents',
      attributes: {
        content,
      },
    },
  });

  request
    .setEndpoint(TOPICS_ENDPOINT)
    .setResource(topicId)
    .setSubEndpoint(TOPICS_CONTENT_ENDPOINT)
    .setMethod(m.methodTypes.PATCH)
    .setBody(body)
    .setToken(token);

  return request.execute();
};

const getContent = (
  topicId: Identifier,
  token: string,
): Promise<m.ApiResponseData> => {
  const request = new ApiRequest();

  request
    .setEndpoint(TOPICS_ENDPOINT)
    .setResource(topicId)
    .setSubEndpoint(TOPICS_CONTENT_ENDPOINT)
    .setMethod(m.methodTypes.GET)
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
