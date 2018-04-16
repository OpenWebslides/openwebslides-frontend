// @flow

import ApiRequest from 'lib/api/ApiRequest';

import { methodTypes } from 'lib/api/model';

import { ENDPOINT } from './constants';

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

const Api = {
  fetch,
};

export default Api;
