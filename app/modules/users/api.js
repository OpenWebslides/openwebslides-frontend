// @flow

import type { Identifier } from 'types/model';

import Api from 'lib/api';

import { ENDPOINT } from './constants';

const { methodTypes, Response } = Api.model;
const { ApiRequest } = Api;

const get = (id: Identifier): Promise<Response> => {
  const request = new ApiRequest();

  request
    .setEndpoint(ENDPOINT)
    .setMethod(methodTypes.GET)
    .setResource(id);

  return request.execute();
};

const UsersApi = {
  get,
};

export default UsersApi;
