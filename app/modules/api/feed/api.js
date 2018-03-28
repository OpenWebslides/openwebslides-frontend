// @flow

import ApiRequest from '../ApiRequest';

import { GET } from '../constants';

import { ENDPOINT } from './constants';

const fetch = async () => {
  const request = new ApiRequest();

  request
    .setEndpoint(ENDPOINT)
    .setMethod(GET)
    .addParameter('sort', '-createdAt')
    .addParameter('page[offset]', 0);

  const response = await request.execute();
  const responseBody = await response.json();

  return responseBody.data;
};

export {
  fetch,
};
