// @flow

import type { Identifier } from 'types/model';

import { methodTypes } from '../model';
import type { Response } from '../model';
import ApiRequest from '../ApiRequest';

import { USERS_ENDPOINT } from './constants';

const get = (id: Identifier, token: ?string): Promise<Response> => {
  const request = new ApiRequest();

  request
    .setEndpoint(USERS_ENDPOINT)
    .setMethod(methodTypes.GET)
    .setResource(id)
    .setToken(token);

  return request.execute();
};

const post = (
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

const UsersApi = {
  get,
  post,
};

export default UsersApi;
