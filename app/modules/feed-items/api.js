// @flow

import Api from 'lib/api';

import { ENDPOINT } from './constants';

const { methodTypes, Response } = Api.model;
const { ApiRequest } = Api;

const fetch = async (): Promise<Response> => {
  const request = new ApiRequest();

  request
    .setEndpoint(ENDPOINT)
    .setMethod(methodTypes.GET)
    .setParameter('sort', '-createdAt')
    .setParameter('page[limit]', '10')
    .setParameter('page[offset]', '0')
    .setParameter('include', 'user');

  return request.execute();
};

const FeedApi = {
  fetch,
};

export default FeedApi;
