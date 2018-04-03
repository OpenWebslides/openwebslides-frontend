// @flow

import ApiRequest from 'lib/api/ApiRequest';

import { methodTypes } from 'lib/api/model';

import { ENDPOINT } from './constants';

const fetch = async (): string => {
  const request = new ApiRequest();

  request
    .setEndpoint(ENDPOINT)
    .setMethod(methodTypes.GET)
    .addParameter('sort', '-createdAt')
    .addParameter('page[limit]', '10')
    .addParameter('page[offset]', '0');

  const response = await request.execute();

  return response;
};

const Api = {
  fetch,
};

export default Api;
