// @flow

import Api from 'lib/api';

import {
  TOKEN_ENDPOINT,
  USERS_ENDPOINT,
} from './constants';

const { methodTypes, Response } = Api.model;
const { ApiRequest } = Api;

const signinEmail = (email: string, password: string): Promise<Response> => {
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
    .setEndpoint(TOKEN_ENDPOINT)
    .setMethod(methodTypes.POST)
    .setBody(body);

  return request.execute();
};

const signout = (token: string): Promise<Response> => {
  const request = new ApiRequest();

  request
    .setEndpoint(TOKEN_ENDPOINT)
    .setMethod(methodTypes.DELETE)
    .setToken(token);

  return request.execute();
};

const signup = (
  email: string,
  firstName: string,
  lastName: ?string,
  password: string,
  tosAccepted: boolean,
): Promise<Response> => {
  const request = new ApiRequest();

  const body = JSON.stringify({
    data: {
      type: 'users',
      attributes: {
        email,
        firstName,
        lastName,
        password,
        tosAccepted,
      },
    },
  });

  request
    .setEndpoint(USERS_ENDPOINT)
    .setMethod(methodTypes.POST)
    .setBody(body);

  return request.execute();
};

const AuthApi = {
  signinEmail,
  signout,
  signup,
};

export default AuthApi;
