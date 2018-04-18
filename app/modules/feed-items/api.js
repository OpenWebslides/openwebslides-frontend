// @flow

import Api from 'modules/api';

import { ENDPOINT } from './constants';

const { methodTypes } = Api.model;
const { ApiRequest } = Api;

const fetch = async (): Promise<string> => {
  const request = new ApiRequest();

  request
    .setEndpoint(ENDPOINT)
    .setMethod(methodTypes.GET)
    .setParameter('sort', '-createdAt')
    .setParameter('page[limit]', '10')
    .setParameter('page[offset]', '0');

  return request.execute();
};

const FeedApi = {
  fetch,
};

export default FeedApi;
