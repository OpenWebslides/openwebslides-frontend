// @flow

import type { Identifier } from 'types/model';

import * as m from '../model';
import ApiRequest from '../ApiRequest';

import { USERS_ENDPOINT } from './constants';

const get = (id: Identifier, token: ?string): Promise<m.ApiResponseData> => {
  const request = new ApiRequest();

  request
    .setEndpoint(USERS_ENDPOINT)
    .setMethod(m.methodTypes.GET)
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
): Promise<m.ApiResponseData> => {
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
    .setMethod(m.methodTypes.POST)
    .setBody(body);

  return request.execute();
};

const UsersApi = {
  get,
  post,
};

export default UsersApi;
