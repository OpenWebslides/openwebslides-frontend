// @flow

import ApiRequest from 'modules/api/ApiRequest';

import { methodTypes } from 'modules/api/model';

import { ENDPOINT } from './constants';

const signinEmail = (email: string, password: string): string => {
  const request = new ApiRequest();

  const body = JSON.stringify({
    data: {
      type: 'tokens',
      attributes: {
        email,
        password,
      },
    },
  });

  request
    .setEndpoint(ENDPOINT)
    .setMethod(methodTypes.POST)
    .setBody(body);

  return request.execute();
};

const signout = (): void => {
  const request = new ApiRequest();

  request
    .setEndpoint(ENDPOINT)
    .setMethod(methodTypes.DELETE);

  return request.execute();
};

const Api = {
  signinEmail,
  signout,
};

export default Api;
