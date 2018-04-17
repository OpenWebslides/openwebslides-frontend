// @flow

import Api from 'lib/api';

import { ENDPOINT } from './constants';

const { methodTypes } = Api.model;
const { ApiRequest } = Api;

const fetch = (): string => {
  const request = new ApiRequest();

  request
    .setEndpoint(ENDPOINT)
    .setMethod(methodTypes.GET)
    .addParameter('sort', '-createdAt')
    .addParameter('page[limit]', '10')
    .addParameter('page[offset]', '0');

  return request.execute();
};

const FeedApi = {
  fetch,
};

export default FeedApi;
