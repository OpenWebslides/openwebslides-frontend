// @flow

import ApiRequest from 'lib/api/ApiRequest';

import { methodTypes } from 'lib/api/model';

import { ENDPOINT } from './constants';

const signinEmail = (email: string, password: string): string => {
  const request = new ApiRequest();

  request
    .setEndpoint(ENDPOINT)
    .setMethod(methodTypes.POST)
    .setBody(/* TODO */);

  return request.execute();
};

const Api = {
  signinEmail,
};

export default Api;
