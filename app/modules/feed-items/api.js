// @flow

import ApiRequest from 'lib/api/ApiRequest';

import { ENDPOINT } from './constants';

const fetch = async () => {
  const request = new ApiRequest();

  request
    .setEndpoint(ENDPOINT)
    .setMethod('GET')
    .addParameter('sort', '-createdAt')
    .addParameter('page[offset]', 0);

  const response = await request.execute();
  const responseBody = await response.json();

  return responseBody.data;
};

const Api = {
  fetch,
};

export default Api;
