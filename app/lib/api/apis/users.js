// @flow

import type { Identifier } from 'types/model';

import { methodTypes } from '../model';
import type { Response } from '../model';

import ApiRequest from '../ApiRequest';

import { USERS_ENDPOINT } from './constants';

const get = (id: Identifier): Promise<Response> => {
  const request = new ApiRequest();

  request
    .setEndpoint(USERS_ENDPOINT)
    .setMethod(methodTypes.GET)
    .setResource(id);

  return request.execute();
};

const UsersApi = {
  get,
};

export default UsersApi;
