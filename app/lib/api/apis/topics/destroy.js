// @flow
/**
 * API docs: #TODO
 */

import type { Identifier } from 'types/model';

import * as m from '../../model';
import ApiRequest from '../../ApiRequest';
import { TOPICS_ENDPOINT } from '../endpoints';

const destroy = (id: Identifier, token: m.Token): Promise<m.ApiResponseData> => {
  const request = new ApiRequest();

  request
    .setEndpoint(TOPICS_ENDPOINT)
    .setMethod(m.methodTypes.DELETE)
    .setResource(id)
    .setToken(token);

  return request.execute();
};

export default destroy;
