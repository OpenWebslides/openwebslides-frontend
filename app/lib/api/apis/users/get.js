// @flow
/**
 * API docs: https://openwebslides.github.io/documentation/#users-api
 */

import type { Identifier } from 'types/model';

import * as m from '../../model';
import ApiRequest from '../../ApiRequest';
import { USERS_ENDPOINT } from '../endpoints';

const get = (id: Identifier, token: ?string): Promise<m.ApiResponseData> => {
  const request = new ApiRequest();

  request
    .setEndpoint(USERS_ENDPOINT)
    .setMethod(m.methodTypes.GET)
    .setResource(id)
    .setToken(token);

  return request.execute();
};

export default get;
